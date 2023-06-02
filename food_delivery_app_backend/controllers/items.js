const Item = require("../models/items");
const Category = require("../models/categories");
exports.postItem = async (req, res, next) => {
  let itemId;
  let category = await Category.findOne({
    categoryName: req.body.itemCategoryName,
  });

  try {
    if (!category) {
      const newcategory = new Category({
        categoryName: req.body.itemCategoryName,
        categoryImage: req.body.itemImage,
      });
      category = await newcategory.save();
      // res.status(200).json({ message: "category saved" });
    }
    const item = new Item({
      itemName: req.body.itemName,
      itemCategoryName: req.body.itemCategoryName,
      imageUrl: req.body.itemImage,
      price: req.body.price,
      description: req.body.description,
      categoryId: category._id,
    });
    const itemData = await item.save();

    itemId = itemData._id;
    res.status(200).json({ message: "Item saved" });
    category = await Category.findById(itemData.categoryId);

    category.items.push(itemId);
    category.save();
  } catch (error) {
    console.log(error);
  }
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
