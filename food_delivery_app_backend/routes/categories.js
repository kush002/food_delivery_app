const express = require("express");
const catController = require("../controllers/categories");

const router = express.Router();

router.post("/category", catController.addCategory);

router.get("/category", catController.getCategory);

router.delete("/category/:categoryId", catController.deleteCategory);

module.exports = router;
