const Razorpay = require("razorpay");

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

    console.log(JSON.stringify(order, null, 2));

    res.status(200).json({ success: true, data: { ...order } });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.verify = async (req, res, next) => {
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

    console.log(JSON.stringify(order, null, 2));

    res.status(200).json({ success: true, data: { ...order } });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
