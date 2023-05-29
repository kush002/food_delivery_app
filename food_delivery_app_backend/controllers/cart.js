const Cart = require("../models/cart");
const items = require("../models/items");

exports.postEmptyCart = async (req, res, next) => {
  let cart = await Cart.findOne();

  if (!cart) {
    const newcart = new Cart({
      items: req.body.items,
      totalQuantity: req.body.totalQuantity,
    });
    result = await newcart.save();
    res.status(200).json({ message: "cart created", cart: result });
  } else {
    res.status(200).json({ message: "cart created", cart: cart });
  }
};
exports.postCart = (req, res, next) => {
  // console.log("userrrrrrrrrrrrr:", req.userId);
  const cartId = req.params.cartId;

  const updateData = {
    ...req.body,
    // userAttached: req.userId,
  };
  const options = { upsert: true };

  // if (!cartId) {
  //   const cart = new Cart({
  //     updateData,
  //   });

  //   cart.save().then((result) => {
  //     res.status(200).json({ message: "Success" });
  //   });
  // }

  Cart.findOneAndUpdate({ _id: cartId }, updateData, options)
    .then((updatedCart) => {
      res.status(200).json({ message: "Success" });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = async (req, res, next) => {
  try {
    console.log("djfjdhfkjsd:", req.params.cartId);
    const cartId = req.params.cartId;
    const cart = await Cart.findById(cartId);
    console.log("chugal:", cart);
    res.status(200).json({ message: "success", carts: { cart } });
  } catch (error) {
    console.log("lanks");
  }
  // console.log("djfjdhfkjsd:", req.params.cartId);
  // const cartId = req.params.cartId;
  // const cart = await Cart.findById(cartId);
  // console.log("chugal:", cart);
  // res.status(200).json({ message: "success", carts: { cart } });
};
