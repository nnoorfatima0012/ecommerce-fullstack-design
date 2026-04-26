require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = require("../../config/db");

const Category = require("../features/categories/category.model");
const Product = require("../features/products/product.model");

connectDB();

const seedData = async () => {
  try {
    await Category.deleteMany();
    await Product.deleteMany();

    console.log("Old data removed");

    // Categories
    const categories = await Category.insertMany([
      { name: "Consumer electronics", slug: "consumer-electronics" },
      { name: "Home and outdoor", slug: "home-outdoor" },
      { name: "Clothes and wear", slug: "clothes-wear" },
      { name: "Automobiles", slug: "automobiles" },
    ]);

    console.log("Categories added");

    // Products
    const products = [
      {
        title: "Smart watch silver color",
        slug: "smart-watch-silver",
        category: categories[0]._id,
        price: 25,
        oldPrice: 35,
        discount: 25,
        images: ["https://img.icons8.com/color/200/apple-watch-apps.png"],
        rating: 4.5,
        reviewsCount: 32,
        sold: 154,
        stock: 20,
        description: "High quality smart watch.",
        brand: "Apple",
        isFeatured: true,
        isRecommended: true,
        isDeal: true,
        supplier: {
          name: "Guanjxi Trading LLC",
          country: "Germany",
          verified: true,
        },
        shipping: {
          freeShipping: true,
          deliveryTime: "7-14 days",
          shipsFrom: "Germany",
        },
      },
      {
        title: "Wireless Headphones",
        slug: "wireless-headphones",
        category: categories[0]._id,
        price: 18,
        oldPrice: 25,
        discount: 20,
        images: ["https://img.icons8.com/color/200/headphones.png"],
        rating: 4.3,
        reviewsCount: 12,
        sold: 80,
        stock: 15,
        description: "Comfortable wireless headphones.",
        brand: "Sony",
        isFeatured: true,
        isDeal: true,
        supplier: {
          name: "Audio Supplier Ltd",
          country: "China",
          verified: true,
        },
        shipping: {
          freeShipping: true,
          deliveryTime: "5-10 days",
          shipsFrom: "China",
        },
      },
      {
        title: "Kitchen Mixer",
        slug: "kitchen-mixer",
        category: categories[1]._id,
        price: 100,
        oldPrice: 120,
        discount: 10,
        images: ["https://img.icons8.com/color/200/blender.png"],
        rating: 4.2,
        reviewsCount: 8,
        sold: 40,
        stock: 10,
        description: "Powerful kitchen mixer.",
        brand: "Philips",
        supplier: {
          name: "Home Supplies Inc",
          country: "Turkey",
          verified: true,
        },
        shipping: {
          freeShipping: false,
          deliveryTime: "10-15 days",
          shipsFrom: "Turkey",
        },
      },
      {
        
  title: "Gaming Controller",
  slug: "gaming-controller",
  category: categories[0]._id,
  price: 35,
  images: ["https://img.icons8.com/color/200/controller.png"],
  rating: 4.6,
  reviewsCount: 18,
  sold: 72,
  stock: 30,
  description: "Professional gaming controller.",
  brand: "Logitech",
  isRecommended: true,
  supplier: {
    name: "TechZone Suppliers",
    country: "United States",
    verified: true,
  },
  shipping: {
    freeShipping: true,
    deliveryTime: "5-12 days",
    shipsFrom: "United States",
  },
},
    ];

    await Product.insertMany(products);

    console.log("Products added");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();