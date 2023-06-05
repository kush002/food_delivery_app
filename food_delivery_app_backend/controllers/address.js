const Address = require("../models/address");

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
