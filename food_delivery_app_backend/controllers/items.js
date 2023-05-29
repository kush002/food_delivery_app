const Item = require("../models/items");
const Category = require("../models/categories");
exports.postItem = (req, res, next) => {
  let itemId;
  Category.findOne({ categoryName: req.body.itemCategoryName })

    .then((result) => {
      const item = new Item({
        itemName: req.body.itemName,
        itemCategoryName: req.body.itemCategoryName,
        imageUrl: req.body.itemImage,
        price: req.body.price,
        description: req.body.description,
        categoryId: result._id,
      });

      return item.save();
    })
    .then((itemData) => {
      itemId = itemData._id;
      res.status(200).json({ message: "Item saved" });
      return Category.findById(itemData.categoryId);
    })
    .then((category) => {
      category.items.push(itemId);
      category.save();
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getItem = (req, res, next) => {
  Item.find()
    .then((result) => {
      res.status(200).json({ message: "Success bro", items: result });
    })
    .catch((err) => {
      console.log(err);
    });
};
