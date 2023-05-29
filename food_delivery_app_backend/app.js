const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());

const catRouter = require("./routes/categories");
const itemsRouter = require("./routes/items");
const cartRouter = require("./routes/cart");
const userRouter = require("./routes/auth");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/admin", catRouter);
app.use("/menu", itemsRouter);
app.use("/user", cartRouter);
app.use(userRouter);

app.use("/error", (error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

mongoose
  .connect(process.env.DATABASE)
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
