

const express = require("express");

const {
  getProducts,
  getProduct,
  getProductBySlug,
  getFilterOptions,
  createProduct,
  updateProduct,
  deleteProduct,
  restoreProduct,
  permanentDeleteProduct,
} = require("./product.controller");

const { protect, adminOnly } = require("../../middleware/auth.middleware");

const router = express.Router();

router.get("/", getProducts);
router.get("/filter-options", getFilterOptions);
router.get("/slug/:slug", getProductBySlug);

router.post("/", protect, adminOnly, createProduct);
router.patch("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);
router.patch("/:id/restore", protect, adminOnly, restoreProduct);
router.delete("/:id/permanent", protect, adminOnly, permanentDeleteProduct);

router.get("/:id", getProduct);

module.exports = router;