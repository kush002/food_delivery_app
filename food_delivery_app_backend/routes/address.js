const express = require("express");
const addressController = require("../controllers/address");
const isAuth = require("../middleware/is-auth");
const router = express.Router();

router.get("/address", isAuth, addressController.getAddress);

router.post("/address", isAuth, addressController.postAddress);

router.put("/address/:addressId", isAuth, addressController.editAddress);

router.delete("/address/:addressId", isAuth, addressController.deleteAddress);
module.exports = router;
