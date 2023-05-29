const express = require("express");

const router = express.Router();
const cartControllers = require("../controllers/cart");

router.post("/cart", cartControllers.postEmptyCart);
router.put("/cart/:cartId", cartControllers.postCart);

router.get("/cart/:cartId", cartControllers.getCart);

module.exports = router;
