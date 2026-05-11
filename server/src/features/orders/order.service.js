// server/src/features/orders/order.service.js
const Order = require("./order.model");

const createOrder = async (orderData) => {
  return await Order.create(orderData);
};

const getAllOrders = async () => {
  return await Order.find({}).sort({ createdAt: -1 });
};

const updateOrderStatus = async (orderId, status) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  order.status = status;
  await order.save();

  return order;
};

const trackOrder = async ({ orderNumber, email, phone }) => {
  const query = {
    orderNumber: orderNumber.trim().toUpperCase(),
  };

  if (phone) {
    query["customer.phone"] = phone.trim();
  }

  if (email) {
    query["customer.email"] = email.trim().toLowerCase();
  }

  const order = await Order.findOne(query);

  if (!order) {
    throw new Error(
      "Order not found. Please check your order ID and email/phone.",
    );
  }

  return order;
};

const getMyOrders = async (userId) => {
  return await Order.find({ user: userId }).sort({ createdAt: -1 });
};

const getMyOrderById = async (userId, orderId) => {
  const order = await Order.findOne({
    _id: orderId,
    user: userId,
  });

  if (!order) {
    throw new Error("Order not found");
  }

  return order;
};
module.exports = {
  createOrder,
  getAllOrders,
  updateOrderStatus,
  trackOrder,
  getMyOrders,
  getMyOrderById,
};
