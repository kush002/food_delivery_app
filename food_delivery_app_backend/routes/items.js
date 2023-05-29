const express = require("express");

const router = express.Router();
const itemsController = require("../controllers/items");

router.post("/items", itemsController.postItem);

router.get("/items", itemsController.getItem);

module.exports = router;
