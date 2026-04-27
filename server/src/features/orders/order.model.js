const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    title: String,
    image: String,
    price: Number,
    quantity: Number,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    customer: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: String,
    },

    items: [orderItemSchema],

    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    total: { type: Number, required: true },

    paymentMethod: {
      type: String,
      enum: ["cash_on_delivery", "bank_transfer", "card"],
      default: "cash_on_delivery",
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);