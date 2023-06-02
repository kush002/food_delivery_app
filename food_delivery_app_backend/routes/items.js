const express = require("express");

const router = express.Router();
const itemsController = require("../controllers/items");
const isAuth = require("../middleware/is-auth");

router.post("/items", itemsController.postItem);

router.get("/items", itemsController.getItem);

module.exports = router;
