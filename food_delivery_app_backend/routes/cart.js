const express = require("express");

const router = express.Router();
const cartControllers = require("../controllers/cart");
const isAuth = require("../middleware/is-auth");
router.post("/cart/:userId", isAuth, cartControllers.postEmptyCart);
router.put("/cart/:cartId", isAuth, cartControllers.postCart);

router.get("/cart", isAuth, cartControllers.getCart);

module.exports = router;
