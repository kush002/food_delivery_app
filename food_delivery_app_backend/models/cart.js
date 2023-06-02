const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  // _id: {
  //   type: Schema.Types.ObjectId,
  // default: uuidv4,
  // unique: true,
  // index: true,
  // },
  items: {
    type: Array,
    required: true,
  },
  totalQuantity: {
    type: Number,
    // required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Cart", cartSchema);
