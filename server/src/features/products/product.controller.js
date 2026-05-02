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

const createProduct = async (req, res, next) => {
  try {
    const product = await productService.createProduct(req.body);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await productService.deleteProduct(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    res.json({
      success: true,
      message: "Product hidden successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const restoreProduct = async (req, res, next) => {
  try {
    const product = await productService.restoreProduct(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    res.json({
      success: true,
      message: "Product restored successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const permanentDeleteProduct = async (req, res, next) => {
  try {
    const product = await productService.permanentDeleteProduct(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    res.json({
      success: true,
      message: "Product deleted permanently",
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
  createProduct,
  updateProduct,
  deleteProduct,
  restoreProduct,
  permanentDeleteProduct,
};