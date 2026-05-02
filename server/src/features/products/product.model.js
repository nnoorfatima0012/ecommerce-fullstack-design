//server/src/features/products/product.model.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    subCategory: {
      type: String,
    },

    brand: {
      type: String,
    },

    price: {
      type: Number,
      required: true,
    },

    oldPrice: {
      type: Number,
    },

    discount: {
      type: Number,
    },

    minOrder: {
      type: Number,
      default: 1,
    },

    unit: {
      type: String,
      default: "pcs",
    },

    images: [
      {
        type: String,
      },
    ],

    rating: {
      type: Number,
      default: 0,
    },

    reviewsCount: {
      type: Number,
      default: 0,
    },

    sold: {
      type: Number,
      default: 0,
    },

    stock: {
      type: Number,
      default: 0,
    },

    inStock: {
      type: Boolean,
      default: true,
    },

    specifications: {
      type: Map,
      of: String,
    },

    supplier: {
      name: String,
      country: String,
      verified: Boolean,
    },

    shipping: {
      freeShipping: Boolean,
      deliveryTime: String,
      shipsFrom: String,
    },

    tags: [String],

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isRecommended: {
      type: Boolean,
      default: false,
    },

    isDeal: {
      type: Boolean,
      default: false,
    },
    isHotOffer: {
      type: Boolean,
      default: false,
    },

    isGiftBox: {
      type: Boolean,
      default: false,
    },

    isNewArrival: {
      type: Boolean,
      default: false,
    },

    isTopSelling: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Product", productSchema);
