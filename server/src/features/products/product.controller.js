// server/src/features/products/product.controller.js
const productService = require("./product.service");

// Utility to convert FormData strings to proper types
const parseBooleansAndNumbers = (data) => {
  const parsed = { ...data };

  // Convert known boolean fields
  ["isFeatured", "isRecommended", "isDeal", "isHotOffer", "isGiftBox", "isNewArrival", "isTopSelling", "isActive"].forEach((field) => {
    if (parsed[field] === "true") parsed[field] = true;
    if (parsed[field] === "false") parsed[field] = false;
  });

  // Convert numbers
  ["price", "oldPrice", "discount", "stock"].forEach((field) => {
    if (parsed[field] !== undefined) parsed[field] = Number(parsed[field]);
  });

  return parsed;
};

// ----------------------- CREATE PRODUCT -----------------------
const createProduct = async (req, res, next) => {
  try {
    let productData = parseBooleansAndNumbers({ ...req.body });

    // --- Supplier info ---
    productData.supplier = {
      name: req.body.supplierName || "",
      country: req.body.supplierCountry || "",
      verified: req.body.supplierVerified === "true",
    };

    // --- Shipping info ---
    productData.shipping = {
      freeShipping: req.body.freeShipping === "true",
      deliveryTime: req.body.deliveryTime || "5-10 days",
      shipsFrom: req.body.shipsFrom || "",
    };

    // --- Images ---
    let existingImages = [];
    if (req.body.existingImages) {
      try {
        existingImages = JSON.parse(req.body.existingImages);
      } catch {
        existingImages = Array.isArray(req.body.existingImages)
          ? req.body.existingImages
          : [req.body.existingImages];
      }
    }

    const uploadedImages = req.files?.map((file) => file.path) || [];
    productData.images = [...existingImages, ...uploadedImages];

    const product = await productService.createProduct(productData);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error("Create Product Error:", error);
    next(error);
  }
};

// ----------------------- UPDATE PRODUCT -----------------------
const updateProduct = async (req, res, next) => {
  try {
    let productData = parseBooleansAndNumbers({ ...req.body });

    // --- Supplier info ---
    productData.supplier = {
      name: req.body.supplierName || "",
      country: req.body.supplierCountry || "",
      verified: req.body.supplierVerified === "true",
    };

    // --- Shipping info ---
    productData.shipping = {
      freeShipping: req.body.freeShipping === "true",
      deliveryTime: req.body.deliveryTime || "5-10 days",
      shipsFrom: req.body.shipsFrom || "",
    };

    // --- Images ---
    let existingImages = [];
    if (req.body.existingImages) {
      try {
        existingImages = JSON.parse(req.body.existingImages);
      } catch {
        existingImages = Array.isArray(req.body.existingImages)
          ? req.body.existingImages
          : [req.body.existingImages];
      }
    }

    const uploadedImages = req.files?.map((file) => file.path) || [];
    productData.images = [...existingImages, ...uploadedImages];

    const product = await productService.updateProduct(req.params.id, productData);

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
    console.error("Update Product Error:", error);
    next(error);
  }
};

// ----------------------- OTHER CONTROLLERS -----------------------
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
    res.json({ success: true, data: product });
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
    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

const getFilterOptions = async (req, res, next) => {
  try {
    const filters = await productService.getProductFilterOptions(req.query);
    res.json({ success: true, data: filters });
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
    res.json({ success: true, message: "Product hidden successfully", data: product });
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
    res.json({ success: true, message: "Product restored successfully", data: product });
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
    res.json({ success: true, message: "Product deleted permanently" });
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