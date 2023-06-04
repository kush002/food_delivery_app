const express = require("express");
const catController = require("../controllers/categories");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post("/category", catController.addCategory);

router.get("/category", catController.getCategory);

router.delete("/category/:categoryId", isAuth, catController.deleteCategory);

router.put("/category/:catId", isAuth, catController.editCategory);

module.exports = router;
