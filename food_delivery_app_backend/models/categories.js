const mongoose = require("mongoose");
const item = require("./items");

const Schema = mongoose.Schema;

const categoriesSchema = new Schema({
  categoryName: {
    type: String,
    required: true,
  },

  categoryImage: {
    type: String,
    required: true,
  },

  items: [
    {
      type: Schema.Types.ObjectId,
      ref: item._id,
      // required: true,
    },
  ],
});

module.exports = mongoose.model("Category", categoriesSchema);
