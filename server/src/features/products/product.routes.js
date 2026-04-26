//server/src/features/products/product.routes.js
const express = require("express");

const {
  getProducts,
  getProduct,
  getProductBySlug,
} = require("./product.controller");

const router = express.Router();

router.get("/", getProducts);
router.get("/slug/:slug", getProductBySlug);
router.get("/:id", getProduct);

module.exports = router;