const Razorpay = require("razorpay");
const crypto = require("crypto");
const Cart = require("../models/cart");
const Payment = require("../models/payment");
var instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});
exports.checkout = async (req, res, next) => {
  console.log(req.body.amount, req.body.currency);
  const options = {
    amount: Number(req.body.amount * 100), // amount in the smallest currency unit
    currency: String(req.body.currency),
  };
  try {
    const order = await instance.orders.create(options);
    if (!order) {
      const error = new Error("data not found");
      error.statusCode = 401;
      throw error;
    }
    // console.log(req.userId);
    const cart = await Cart.findOneAndUpdate(
      { user: req.userId },
      { items: [], totalQuantity: 0 },
      { new: true }
    );

    // console.log(cart._id);
    res
      .status(200)
      .json({ success: true, data: { ...order, cartId: cart._id } });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.verify = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      //send to database
      const payment = new Payment({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      await payment.save();
      // res.status(200).json({ message: "payment successful" });
      console.log(req.notes);
      // const cart = await Cart.findOne({ user: req.userId });

      // console.log(cart._id);

      res.redirect(
        `https://sunbloomcafe.netlify.app/paymentsuccessful?reference=${razorpay_payment_id}`
      );
    } else {
      const error = new Error("signature is not authentic");
      error.statusCode = 401;
      throw error;
    }

    res.status(200).json({ success: true });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getKey = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, key: process.env.RAZORPAY_API_KEY });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
