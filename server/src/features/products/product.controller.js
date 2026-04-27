//server/src/features/products/product.controller.js
const productService = require("./product.service");

const getProducts = async (req, res, next) => {
  try {
    const result = await productService.getAllProducts(req.query);

    res.json({
      success: true,
      count: result.products.length,
      data: result.products,
      pagination: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        pages: result.pages,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const getProductBySlug = async (req, res, next) => {
  try {
    const product = await productService.getProductBySlug(req.params.slug);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};
const getFilterOptions = async (req, res, next) => {
  try {
    const filters = await productService.getProductFilterOptions(req.query);

    res.json({
      success: true,
      data: filters,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProduct,
  getProductBySlug,
  getFilterOptions,
};