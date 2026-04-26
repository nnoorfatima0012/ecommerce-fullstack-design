//server/src/features/products/product.service.js
const Product = require("./product.model");

const getAllProducts = async (queryParams) => {
  const {
    search,
    category,
    minPrice,
    maxPrice,
    sort,
    deal,
    featured,
    recommended,
  } = queryParams;

  const query = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { brand: { $regex: search, $options: "i" } },
      { tags: { $regex: search, $options: "i" } },
    ];
  }

  if (category) {
    query.category = category;
  }

  if (deal === "true") query.isDeal = true;
  if (featured === "true") query.isFeatured = true;
  if (recommended === "true") query.isRecommended = true;

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  let sortOption = { createdAt: -1 };

  if (sort === "price-low") sortOption = { price: 1 };
  if (sort === "price-high") sortOption = { price: -1 };
  if (sort === "rating") sortOption = { rating: -1 };
  if (sort === "newest") sortOption = { createdAt: -1 };

  return await Product.find(query)
    .populate("category", "name slug")
    .sort(sortOption);
};

const getProductById = async (id) => {
  return await Product.findById(id).populate("category", "name slug");
};

const getProductBySlug = async (slug) => {
  return await Product.findOne({ slug }).populate("category", "name slug");
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductBySlug,
};