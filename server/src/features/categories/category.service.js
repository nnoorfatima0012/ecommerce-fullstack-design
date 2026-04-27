//server/src/features/categories/category.service.js
const Category = require("./category.model");

const getAllCategories = async () => {
  return await Category.find({}).sort({ name: 1 });
};

module.exports = {
  getAllCategories,
};