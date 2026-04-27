const Order = require("./order.model");

const createOrder = async (orderData) => {
  return await Order.create(orderData);
};

const getAllOrders = async () => {
  return await Order.find({}).sort({ createdAt: -1 });
};

module.exports = {
  createOrder,
  getAllOrders,
};