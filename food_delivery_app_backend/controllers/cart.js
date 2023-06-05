const Cart = require("../models/cart");
const items = require("../models/items");
const User = require("../models/user");

exports.postEmptyCart = async (req, res, next) => {
  // const userId = req.params.userId;
  let cart = await Cart.findOne({ user: req.userId });

  if (!cart) {
    const newcart = new Cart({
      items: req.body.items,
      totalQuantity: req.body.totalQuantity,
      user: req.userId,
    });
    result = await newcart.save();
    res.status(200).json({ message: "cart created", cart: result });
  } else {
    res.status(200).json({ message: "cart already created", cart: cart });
  }
};
exports.postCart = async (req, res, next) => {
  const updateData = {
    ...req.body,
  };
  const options = { upsert: true };
  const cartId = req.params.cartId;
  try {
    let cart = await Cart.findOne({ user: req.userId });

    if (!cart) {
      cart = new Cart({
        items: req.body.items,
        totalQuantity: req.body.totalQuantity,
        user: req.userId,
      });
      await cart.save();
      res.status(200).json({ message: "cart created" });

      const user = await User.findById(req.userId);

      if (user.cartId !== cart._id) {
        user.cartId = cart._id;
        await user.save();
      }
    } else {
      await cart.updateOne(updateData, options);

      res.status(200).json({ message: "Success" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.userId });

    res.status(200).json({ message: "Providing cart data", cart: cart });
  } catch (error) {
    console.log("error");
  }
  // console.log("djfjdhfkjsd:", req.params.cartId);
  // const cartId = req.params.cartId;
  // const cart = await Cart.findById(cartId);
  // console.log("chugal:", cart);
  // res.status(200).json({ message: "success", carts: { cart } });
};
