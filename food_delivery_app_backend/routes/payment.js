const express = require("express");

const router = express.Router();

const paymentController = require("../controllers/payment");

router.post("/checkout", paymentController.checkout);

module.exports = router;
