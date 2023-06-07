const express = require("express");

const router = express.Router();

const paymentController = require("../controllers/payment");
const isAuth = require("../middleware/is-auth");

router.post("/checkout", isAuth, paymentController.checkout);

router.post("/verify", paymentController.verify);

router.get("/getKey", isAuth, paymentController.getKey);

module.exports = router;
