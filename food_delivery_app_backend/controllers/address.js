const Address = require("../models/address");

exports.getAddress = async (req, res, next) => {
  try {
    const addresses = await Address.find({ user: req.userId });
    if (!addresses) {
      const error = new Error("Unable to fetch");
      error.statusCode = 401;
      throw error;
    }
    res.status(200).json({ message: "fetch successful", addresses: addresses });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.postAddress = async (req, res, next) => {
  try {
    const address = new Address({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      city: req.body.city,
      country: req.body.country,
      state: req.body.state,
      postalCode: req.body.postalCode,
      phone: req.body.phone,
      user: req.userId,
    });
    console.log("On the way");
    await address.save();
    res.status(200).json({ message: "Address addes successfully" });
  } catch (error) {
    next(error);
  }
};

exports.deleteAddress = async (req, res, next) => {
  try {
    const addressId = await Address.findByIdAndRemove(req.params.addressId);
    if (!addressId) {
      const error = new Error("addressId invalid");
      error.statusCode = 401;
      throw error;
    }
    res.status(200).json({ message: "address deleted" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
