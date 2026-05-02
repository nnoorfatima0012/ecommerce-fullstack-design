////server/src/features/orders/order.controller.js
const orderService = require("./order.service");


const createOrder = async (req, res, next) => {
  try {
    const { customer, items, subtotal, discount, tax, total, paymentMethod } = req.body;

    if (!customer || !items || items.length === 0) {
      res.status(400);
      throw new Error("Customer information and order items are required");
    }

    const order = await orderService.createOrder({
      user: req.user?.id || null,
      customer,
      items,
      subtotal,
      discount,
      tax,
      total,
      paymentMethod,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getAllOrders();

    res.json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};
const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "confirmed",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      res.status(400);
      throw new Error("Invalid order status");
    }

    const order = await orderService.updateOrderStatus(req.params.id, status);

    res.json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

const trackOrder = async (req, res, next) => {
  try {
    const { orderNumber, email, phone } = req.body;

    if (!orderNumber || (!email && !phone)) {
      res.status(400);
      throw new Error("Order ID and email or phone are required");
    }

    const order = await orderService.trackOrder({
      orderNumber,
      email,
      phone,
    });

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

const getMyOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getMyOrders(req.user.id);

    res.json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

const getMyOrderById = async (req, res, next) => {
  try {
    const order = await orderService.getMyOrderById(
      req.user.id,
      req.params.id
    );

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createOrder,
  getOrders,
  updateOrderStatus,
  trackOrder,
  getMyOrders,
  getMyOrderById,
};