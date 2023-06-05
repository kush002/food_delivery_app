const express = require("express");
const addressController = require("../controllers/address");
const isAuth = require("../middleware/is-auth");
const router = express.Router();

router.post("/address", isAuth, addressController.postAddress);
module.exports = router;
