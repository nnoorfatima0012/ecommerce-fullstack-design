


// const express = require("express");

// const {
//   createOrder,
//   getOrders,
//   updateOrderStatus,
//   trackOrder,
// } = require("./order.controller");

// const { protect, adminOnly } = require("../../middleware/auth.middleware");

// const router = express.Router();

// // Guest checkout allowed
// router.post("/", createOrder);

// // Public order tracking allowed
// router.post("/track", trackOrder);

// // Only admin can see all orders
// router.get("/", protect, adminOnly, getOrders);

// // Only admin can update order status
// router.patch("/:id/status", protect, adminOnly, updateOrderStatus);

// module.exports = router;


const express = require("express");

const {
  createOrder,
  getOrders,
  updateOrderStatus,
  trackOrder,
  getMyOrders,
  getMyOrderById,
} = require("./order.controller");

const {
  protect,
  optionalAuth,
  adminOnly,
} = require("../../middleware/auth.middleware");

const router = express.Router();

// Guest or logged-in checkout
router.post("/", optionalAuth, createOrder);

// Public guest tracking
router.post("/track", trackOrder);

// Logged-in user orders
router.get("/my-orders", protect, getMyOrders);
router.get("/my-orders/:id", protect, getMyOrderById);

// Admin orders
router.get("/", protect, adminOnly, getOrders);
router.patch("/:id/status", protect, adminOnly, updateOrderStatus);

module.exports = router;