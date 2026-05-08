//server/src/features/auth/auth.routes.js
const express = require("express");

const {
  register,
  login,
  refresh,
  logout,
  me,
  updateProfile,
} = require("./auth.controller");

const { protect } = require("../../middleware/auth.middleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get("/me", protect, me);
router.patch("/profile", protect, updateProfile);

module.exports = router;