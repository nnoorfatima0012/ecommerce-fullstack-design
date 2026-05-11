// //server/src/features/categories/category.controller.js
const categoryService = require("./category.service");

const getCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getAllCategories(req.query);

    res.json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const { name, slug, icon, image, parent } = req.body;

    if (!name || !slug) {
      res.status(400);
      throw new Error("Category name and slug are required");
    }

    const category = await categoryService.createCategory({
      name,
      slug,
      icon,
      image,
      parent: parent || null,
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const category = await categoryService.updateCategory(
      req.params.id,
      req.body
    );

    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }

    res.json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const hideCategory = async (req, res, next) => {
  try {
    const category = await categoryService.hideCategory(req.params.id);

    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }

    res.json({
      success: true,
      message: "Category hidden successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const restoreCategory = async (req, res, next) => {
  try {
    const category = await categoryService.restoreCategory(req.params.id);

    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }

    res.json({
      success: true,
      message: "Category restored successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  hideCategory,
  restoreCategory,
};