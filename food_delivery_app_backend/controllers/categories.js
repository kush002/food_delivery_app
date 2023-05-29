const Category = require("../models/categories");
const Item = require("../models/items");

exports.getCategory = (req, res, next) => {
  Category.find().then((result) => {
    res.status(200).json({ message: "categories sent", categories: result });
  });
};

exports.addCategory = (req, res, next) => {
  const categoryName = req.body.categoryName;
  const categoryImage = req.body.categoryImage;

  const category = new Category({
    categoryName: categoryName,
    categoryImage: categoryImage,
  });

  category
    .save()
    .then((result) => {
      res.status(200).json({ message: "category saved" });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteCategory = async (req, res, next) => {
  const categoryId = req.params.categoryId;
  const category = await Category.findById(categoryId);
  const items = category.items;

  await Item.deleteMany({ _id: { $in: items } });

  await Category.findByIdAndRemove(categoryId);

  res.status(200).json({ message: "Deleted" });
};
