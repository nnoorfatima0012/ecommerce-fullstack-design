const orderService = require("./order.service");

const createOrder = async (req, res, next) => {
  try {
    const { customer, items, subtotal, discount, tax, total, paymentMethod } = req.body;

    if (!customer || !items || items.length === 0) {
      res.status(400);
      throw new Error("Customer information and order items are required");
    }

    const order = await orderService.createOrder({
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

module.exports = {
  createOrder,
  getOrders,
};