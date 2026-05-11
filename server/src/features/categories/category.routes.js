// //server/src/features/categories/category.routes.js
const express = require("express");
const {
  getCategories,
  createCategory,
  updateCategory,
  hideCategory,
  restoreCategory,
} = require("./category.controller");

const { protect, adminOnly } = require("../../middleware/auth.middleware");

const router = express.Router();

router.get("/", getCategories);

router.post("/", protect, adminOnly, createCategory);
router.patch("/:id", protect, adminOnly, updateCategory);
router.delete("/:id", protect, adminOnly, hideCategory);
router.patch("/:id/restore", protect, adminOnly, restoreCategory);

module.exports = router;