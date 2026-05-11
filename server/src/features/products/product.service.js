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
    hotOffer,
    giftBox,
    newArrival,
    topSelling,
    brand,
    rating,
    verified,
    page = 1,
    limit = 10,
    includeInactive,
  } = queryParams;

  const query =
  includeInactive === "true" ? {} : { isActive: { $ne: false } };

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { brand: { $regex: search, $options: "i" } },
      { tags: { $regex: search, $options: "i" } },
    ];
  }

  if (category) query.category = category;
  if (brand) query.brand = { $in: brand.split(",") };
  if (rating) query.rating = { $gte: Number(rating) };
  if (verified === "true") query["supplier.verified"] = true;

  if (deal === "true") query.isDeal = true;
  if (featured === "true") query.isFeatured = true;
  if (recommended === "true") query.isRecommended = true;

  if (hotOffer === "true") query.isHotOffer = true;
  if (giftBox === "true") query.isGiftBox = true;
  if (newArrival === "true") query.isNewArrival = true;
  if (topSelling === "true") query.isTopSelling = true;

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

  const currentPage = Number(page);
  const perPage = Number(limit);
  const skip = (currentPage - 1) * perPage;

  const total = await Product.countDocuments(query);

  const products = await Product.find(query)
    .populate("category", "name slug")
    .sort(sortOption)
    .skip(skip)
    .limit(perPage);

  return {
    products,
    total,
    page: currentPage,
    limit: perPage,
    pages: Math.ceil(total / perPage),
  };
};

const getProductById = async (id) => {
  return await Product.findById(id).populate("category", "name slug");
};

const getProductBySlug = async (slug) => {
  return await Product.findOne({ slug }).populate("category", "name slug");
};
const createProduct = async (productData) => {
  return await Product.create(productData);
};

const updateProduct = async (id, productData) => {
  const product = await Product.findByIdAndUpdate(id, productData, {
    new: true,
    runValidators: true,
  }).populate("category", "name slug");

  return product;
};

const deleteProduct = async (id) => {
  const product = await Product.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  ).populate("category", "name slug");

  return product;
};

const restoreProduct = async (id) => {
  const product = await Product.findByIdAndUpdate(
    id,
    { isActive: true },
    { new: true }
  ).populate("category", "name slug");

  return product;
};

const permanentDeleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  return product;
};
const getProductFilterOptions = async (queryParams) => {
  const {
    category,
    deal,
    featured,
    recommended,
    hotOffer,
    giftBox,
    newArrival,
    topSelling,
  } = queryParams;

  const baseQuery = { isActive: { $ne: false } };

  if (category) baseQuery.category = category;

  if (deal === "true") baseQuery.isDeal = true;
  if (featured === "true") baseQuery.isFeatured = true;
  if (recommended === "true") baseQuery.isRecommended = true;
  if (hotOffer === "true") baseQuery.isHotOffer = true;
  if (giftBox === "true") baseQuery.isGiftBox = true;
  if (newArrival === "true") baseQuery.isNewArrival = true;
  if (topSelling === "true") baseQuery.isTopSelling = true;

  const brands = await Product.distinct("brand", baseQuery);

  const priceStats = await Product.aggregate([
    { $match: baseQuery },
    {
      $group: {
        _id: null,
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
  ]);

  return {
    brands: brands.filter(Boolean),
    priceRange: {
      min: priceStats[0]?.minPrice || 0,
      max: priceStats[0]?.maxPrice || 0,
    },
    ratings: [5, 4, 3, 2],
  };
};


module.exports = {
  getAllProducts,
  getProductById,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  restoreProduct,
  getProductFilterOptions,
  permanentDeleteProduct,
};