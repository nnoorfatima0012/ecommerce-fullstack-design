// //server/src/features/categories/category.service.js
// const Category = require("./category.model");

// const getAllCategories = async () => {
//   return await Category.find({}).sort({ name: 1 });
// };

// module.exports = {
//   getAllCategories,
// };

const Category = require("./category.model");

const getAllCategories = async (queryParams = {}) => {
  const { includeInactive } = queryParams;

  const query =
    includeInactive === "true" ? {} : { isActive: { $ne: false } };

  return await Category.find(query).sort({ name: 1 });
};

const createCategory = async (categoryData) => {
  return await Category.create(categoryData);
};

const updateCategory = async (id, categoryData) => {
  return await Category.findByIdAndUpdate(id, categoryData, {
    new: true,
    runValidators: true,
  });
};

const hideCategory = async (id) => {
  return await Category.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );
};

const restoreCategory = async (id) => {
  return await Category.findByIdAndUpdate(
    id,
    { isActive: true },
    { new: true }
  );
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  hideCategory,
  restoreCategory,
};