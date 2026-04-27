//server/src/features/categories/category.controller.js
const categoryService = require("./category.service");

const getCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getAllCategories();

    res.json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
};