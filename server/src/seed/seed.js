
// // server/src/seed/seed.js
// require("dotenv").config();

// const connectDB = require("../../config/db");

// const Category = require("../features/categories/category.model");
// const Product = require("../features/products/product.model");

// const seedData = async () => {
//   try {
//     await connectDB();

//     await Category.deleteMany();
//     await Product.deleteMany();

//     console.log("Old data removed");

//     const categories = await Category.insertMany([
//       { name: "Consumer electronics", slug: "consumer-electronics" },
//       { name: "Home and outdoor", slug: "home-outdoor" },
//       { name: "Clothes and wear", slug: "clothes-wear" },
//       { name: "Automobiles", slug: "automobiles" },
//       { name: "Computer and tech", slug: "computer-tech" },
//       { name: "Tools and equipment", slug: "tools-equipment" },
//     ]);

//     console.log("Categories added");

//     const products = [
//       {
//         title: "Smart watch silver color",
//         slug: "smart-watch-silver",
//         category: categories[0]._id,
//         price: 25,
//         oldPrice: 35,
//         discount: 25,
//         images: ["https://img.icons8.com/color/200/apple-watch-apps.png"],
//         rating: 4.5,
//         reviewsCount: 32,
//         sold: 154,
//         stock: 20,
//         description: "High quality smart watch with modern features.",
//         brand: "Apple",
//         isFeatured: true,
//         isRecommended: true,
//         isDeal: true,
//         supplier: {
//           name: "Guanjxi Trading LLC",
//           country: "Germany",
//           verified: true,
//         },
//         shipping: {
//           freeShipping: true,
//           deliveryTime: "7-14 days",
//           shipsFrom: "Germany",
//         },
//       },
//       {
//         title: "Wireless Headphones",
//         slug: "wireless-headphones",
//         category: categories[0]._id,
//         price: 18,
//         oldPrice: 25,
//         discount: 20,
//         images: ["https://img.icons8.com/color/200/headphones.png"],
//         rating: 4.3,
//         reviewsCount: 12,
//         sold: 80,
//         stock: 15,
//         description: "Comfortable wireless headphones for daily use.",
//         brand: "Sony",
//         isFeatured: true,
//         isDeal: true,
//         supplier: {
//           name: "Audio Supplier Ltd",
//           country: "China",
//           verified: true,
//         },
//         shipping: {
//           freeShipping: true,
//           deliveryTime: "5-10 days",
//           shipsFrom: "China",
//         },
//       },
//       {
//         title: "Kitchen Mixer",
//         slug: "kitchen-mixer",
//         category: categories[1]._id,
//         price: 100,
//         oldPrice: 120,
//         discount: 10,
//         images: ["https://img.icons8.com/color/200/blender.png"],
//         rating: 4.2,
//         reviewsCount: 8,
//         sold: 40,
//         stock: 10,
//         description: "Powerful kitchen mixer for home cooking.",
//         brand: "Philips",
//         isRecommended: true,
//         supplier: {
//           name: "Home Supplies Inc",
//           country: "Turkey",
//           verified: true,
//         },
//         shipping: {
//           freeShipping: false,
//           deliveryTime: "10-15 days",
//           shipsFrom: "Turkey",
//         },
//       },
//       {
//         title: "Gaming Controller",
//         slug: "gaming-controller",
//         category: categories[0]._id,
//         price: 35,
//         oldPrice: 45,
//         discount: 15,
//         images: ["https://img.icons8.com/color/200/controller.png"],
//         rating: 4.6,
//         reviewsCount: 18,
//         sold: 72,
//         stock: 30,
//         description: "Professional gaming controller with smooth grip.",
//         brand: "Logitech",
//         isRecommended: true,
//         supplier: {
//           name: "TechZone Suppliers",
//           country: "United States",
//           verified: true,
//         },
//         shipping: {
//           freeShipping: true,
//           deliveryTime: "5-12 days",
//           shipsFrom: "United States",
//         },
//       },
//       {
//         title: "Laptop Backpack",
//         slug: "laptop-backpack",
//         category: categories[2]._id,
//         price: 22,
//         oldPrice: 30,
//         discount: 18,
//         images: ["https://img.icons8.com/color/200/backpack.png"],
//         rating: 4.4,
//         reviewsCount: 25,
//         sold: 110,
//         stock: 45,
//         description: "Durable laptop backpack for office and travel.",
//         brand: "BagPro",
//         isFeatured: true,
//         supplier: {
//           name: "Fashion Hub",
//           country: "Vietnam",
//           verified: true,
//         },
//         shipping: {
//           freeShipping: true,
//           deliveryTime: "8-14 days",
//           shipsFrom: "Vietnam",
//         },
//       },
//       {
//         title: "Men Casual T-Shirt",
//         slug: "men-casual-tshirt",
//         category: categories[2]._id,
//         price: 12,
//         oldPrice: 18,
//         discount: 20,
//         images: ["https://img.icons8.com/color/200/t-shirt.png"],
//         rating: 4.1,
//         reviewsCount: 19,
//         sold: 95,
//         stock: 60,
//         description: "Soft cotton casual t-shirt for men.",
//         brand: "CottonWear",
//         isDeal: true,
//         supplier: {
//           name: "Textile Market",
//           country: "Pakistan",
//           verified: true,
//         },
//         shipping: {
//           freeShipping: false,
//           deliveryTime: "4-8 days",
//           shipsFrom: "Pakistan",
//         },
//       },
//       {
//         title: "Car Tire Set",
//         slug: "car-tire-set",
//         category: categories[3]._id,
//         price: 220,
//         oldPrice: 260,
//         discount: 12,
//         images: ["https://img.icons8.com/color/200/wheel.png"],
//         rating: 4.7,
//         reviewsCount: 42,
//         sold: 65,
//         stock: 12,
//         description: "Premium car tire set for better road grip.",
//         brand: "RoadMax",
//         isFeatured: true,
//         supplier: {
//           name: "Auto Parts Global",
//           country: "Japan",
//           verified: true,
//         },
//         shipping: {
//           freeShipping: true,
//           deliveryTime: "12-20 days",
//           shipsFrom: "Japan",
//         },
//       },
//       {
//         title: "Office Chair",
//         slug: "office-chair",
//         category: categories[1]._id,
//         price: 85,
//         oldPrice: 110,
//         discount: 15,
//         images: ["https://img.icons8.com/color/200/office-chair.png"],
//         rating: 4.4,
//         reviewsCount: 21,
//         sold: 48,
//         stock: 18,
//         description: "Comfortable ergonomic office chair.",
//         brand: "ComfortPro",
//         isRecommended: true,
//         supplier: {
//           name: "Furniture House",
//           country: "Malaysia",
//           verified: true,
//         },
//         shipping: {
//           freeShipping: false,
//           deliveryTime: "10-18 days",
//           shipsFrom: "Malaysia",
//         },
//       },
//       {
//         title: "Wireless Mouse",
//         slug: "wireless-mouse",
//         category: categories[4]._id,
//         price: 10,
//         oldPrice: 15,
//         discount: 22,
//         images: ["https://img.icons8.com/color/200/mouse.png"],
//         rating: 4.2,
//         reviewsCount: 34,
//         sold: 190,
//         stock: 75,
//         description: "Smooth wireless mouse for laptop and desktop.",
//         brand: "Logitech",
//         isDeal: true,
//         supplier: {
//           name: "Digital Accessories Co",
//           country: "China",
//           verified: true,
//         },
//         shipping: {
//           freeShipping: true,
//           deliveryTime: "5-9 days",
//           shipsFrom: "China",
//         },
//       },
//       {
//         title: "Mechanical Keyboard",
//         slug: "mechanical-keyboard",
//         category: categories[4]._id,
//         price: 45,
//         oldPrice: 60,
//         discount: 18,
//         images: ["https://img.icons8.com/color/200/keyboard.png"],
//         rating: 4.8,
//         reviewsCount: 56,
//         sold: 130,
//         stock: 35,
//         description: "RGB mechanical keyboard for gaming and work.",
//         brand: "KeyMaster",
//         isFeatured: true,
//         isRecommended: true,
//         supplier: {
//           name: "PC Gear Supply",
//           country: "Taiwan",
//           verified: true,
//         },
//         shipping: {
//           freeShipping: true,
//           deliveryTime: "7-12 days",
//           shipsFrom: "Taiwan",
//         },
//       },

//       ...Array.from({ length: 40 }).map((_, index) => {
//         const productNames = [
//           "Bluetooth Speaker",
//           "USB Type C Cable",
//           "LED Desk Lamp",
//           "Running Shoes",
//           "Car Vacuum Cleaner",
//           "Power Drill Machine",
//           "Smartphone Tripod",
//           "HD Webcam",
//           "Portable Power Bank",
//           "Electric Kettle",
//           "Non Stick Pan",
//           "Garden Water Hose",
//           "Women Handbag",
//           "Winter Hoodie",
//           "Car Phone Holder",
//           "Motorcycle Helmet",
//           "Laptop Stand",
//           "External Hard Drive",
//           "WiFi Router",
//           "Air Fryer",
//           "Vacuum Flask",
//           "Wall Clock",
//           "Tool Box Kit",
//           "Safety Gloves",
//           "Fitness Dumbbells",
//           "Yoga Mat",
//           "Sunglasses",
//           "Denim Jacket",
//           "Car Air Freshener",
//           "Bike Lock",
//           "Monitor Screen",
//           "Graphic Tablet",
//           "Mobile Charger",
//           "Smart LED Bulb",
//           "Electric Iron",
//           "Hair Dryer",
//           "Storage Organizer",
//           "Camping Tent",
//           "Screwdriver Set",
//           "Portable Fan",
//         ];

//         const name = productNames[index];
//         const slug = name.toLowerCase().replaceAll(" ", "-");

//         const categoryIndex =
//           index % 6 === 0
//             ? 0
//             : index % 6 === 1
//             ? 4
//             : index % 6 === 2
//             ? 1
//             : index % 6 === 3
//             ? 2
//             : index % 6 === 4
//             ? 3
//             : 5;

//         return {
//           title: name,
//           slug,
//           category: categories[categoryIndex]._id,
//           price: 15 + index * 3,
//           oldPrice: 25 + index * 4,
//           discount: index % 2 === 0 ? 15 : 10,
//           images: [
//             `https://placehold.co/400x400?text=${encodeURIComponent(name)}`,
//           ],
//           rating: Number((4 + (index % 9) / 10).toFixed(1)),
//           reviewsCount: 10 + index * 2,
//           sold: 30 + index * 5,
//           stock: 10 + index,
//           description: `${name} with reliable quality and modern design.`,
//           brand: ["Apple", "Sony", "Samsung", "Philips", "Logitech", "Generic"][
//             index % 6
//           ],
//           isFeatured: index % 5 === 0,
//           isRecommended: index % 4 === 0,
//           isDeal: index % 3 === 0,
//           supplier: {
//             name: [
//               "Global Trade Ltd",
//               "Smart Supply Co",
//               "Urban Wholesale",
//               "Premium Exporters",
//               "B2B Market Hub",
//             ][index % 5],
//             country: ["China", "Germany", "Turkey", "Pakistan", "USA"][
//               index % 5
//             ],
//             verified: true,
//           },
//           shipping: {
//             freeShipping: index % 2 === 0,
//             deliveryTime: ["5-10 days", "7-14 days", "10-18 days"][index % 3],
//             shipsFrom: ["China", "Germany", "Turkey", "Pakistan", "USA"][
//               index % 5
//             ],
//           },
//         };
//       }),
//     ];

//     await Product.insertMany(products);

//     console.log(`${products.length} products added successfully`);
//     process.exit();
//   } catch (error) {
//     console.error("Seed error:", error);
//     process.exit(1);
//   }
// };

// seedData();

// server/src/seed/seed.js
require("dotenv").config({ path: __dirname + "/../../.env" });

const connectDB = require("../../config/db");

const Category = require("../features/categories/category.model");
const Product = require("../features/products/product.model");

const seedData = async () => {
  try {
    await connectDB();

    await Category.deleteMany();
    await Product.deleteMany();

    console.log("Old data removed");

    const categories = await Category.insertMany([
      { name: "Consumer electronics", slug: "consumer-electronics" },
      { name: "Home and outdoor", slug: "home-outdoor" },
      { name: "Clothes and wear", slug: "clothes-wear" },
      { name: "Automobiles", slug: "automobiles" },
      { name: "Computer and tech", slug: "computer-tech" },
      { name: "Tools and equipment", slug: "tools-equipment" },
    ]);

    console.log("Categories added");

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
        description: "High quality smart watch with modern features.",
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
        description: "Comfortable wireless headphones for daily use.",
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
        description: "Powerful kitchen mixer for home cooking.",
        brand: "Philips",
        isRecommended: true,
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
        oldPrice: 45,
        discount: 15,
        images: ["https://img.icons8.com/color/200/controller.png"],
        rating: 4.6,
        reviewsCount: 18,
        sold: 72,
        stock: 30,
        description: "Professional gaming controller with smooth grip.",
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
      {
        title: "Laptop Backpack",
        slug: "laptop-backpack",
        category: categories[2]._id,
        price: 22,
        oldPrice: 30,
        discount: 18,
        images: ["https://img.icons8.com/color/200/backpack.png"],
        rating: 4.4,
        reviewsCount: 25,
        sold: 110,
        stock: 45,
        description: "Durable laptop backpack for office and travel.",
        brand: "BagPro",
        isFeatured: true,
        supplier: {
          name: "Fashion Hub",
          country: "Vietnam",
          verified: true,
        },
        shipping: {
          freeShipping: true,
          deliveryTime: "8-14 days",
          shipsFrom: "Vietnam",
        },
      },
      {
        title: "Men Casual T-Shirt",
        slug: "men-casual-tshirt",
        category: categories[2]._id,
        price: 12,
        oldPrice: 18,
        discount: 20,
        images: ["https://img.icons8.com/color/200/t-shirt.png"],
        rating: 4.1,
        reviewsCount: 19,
        sold: 95,
        stock: 60,
        description: "Soft cotton casual t-shirt for men.",
        brand: "CottonWear",
        isDeal: true,
        supplier: {
          name: "Textile Market",
          country: "Pakistan",
          verified: true,
        },
        shipping: {
          freeShipping: false,
          deliveryTime: "4-8 days",
          shipsFrom: "Pakistan",
        },
      },
      {
        title: "Car Tire Set",
        slug: "car-tire-set",
        category: categories[3]._id,
        price: 220,
        oldPrice: 260,
        discount: 12,
        images: ["https://img.icons8.com/color/200/wheel.png"],
        rating: 4.7,
        reviewsCount: 42,
        sold: 65,
        stock: 12,
        description: "Premium car tire set for better road grip.",
        brand: "RoadMax",
        isFeatured: true,
        supplier: {
          name: "Auto Parts Global",
          country: "Japan",
          verified: true,
        },
        shipping: {
          freeShipping: true,
          deliveryTime: "12-20 days",
          shipsFrom: "Japan",
        },
      },
      {
        title: "Office Chair",
        slug: "office-chair",
        category: categories[1]._id,
        price: 85,
        oldPrice: 110,
        discount: 15,
        images: ["https://img.icons8.com/color/200/office-chair.png"],
        rating: 4.4,
        reviewsCount: 21,
        sold: 48,
        stock: 18,
        description: "Comfortable ergonomic office chair.",
        brand: "ComfortPro",
        isRecommended: true,
        supplier: {
          name: "Furniture House",
          country: "Malaysia",
          verified: true,
        },
        shipping: {
          freeShipping: false,
          deliveryTime: "10-18 days",
          shipsFrom: "Malaysia",
        },
      },
      {
        title: "Wireless Mouse",
        slug: "wireless-mouse",
        category: categories[4]._id,
        price: 10,
        oldPrice: 15,
        discount: 22,
        images: ["https://img.icons8.com/color/200/mouse.png"],
        rating: 4.2,
        reviewsCount: 34,
        sold: 190,
        stock: 75,
        description: "Smooth wireless mouse for laptop and desktop.",
        brand: "Logitech",
        isDeal: true,
        supplier: {
          name: "Digital Accessories Co",
          country: "China",
          verified: true,
        },
        shipping: {
          freeShipping: true,
          deliveryTime: "5-9 days",
          shipsFrom: "China",
        },
      },
      {
        title: "Mechanical Keyboard",
        slug: "mechanical-keyboard",
        category: categories[4]._id,
        price: 45,
        oldPrice: 60,
        discount: 18,
        images: ["https://img.icons8.com/color/200/keyboard.png"],
        rating: 4.8,
        reviewsCount: 56,
        sold: 130,
        stock: 35,
        description: "RGB mechanical keyboard for gaming and work.",
        brand: "KeyMaster",
        isFeatured: true,
        isRecommended: true,
        supplier: {
          name: "PC Gear Supply",
          country: "Taiwan",
          verified: true,
        },
        shipping: {
          freeShipping: true,
          deliveryTime: "7-12 days",
          shipsFrom: "Taiwan",
        },
      },

      ...Array.from({ length: 40 }).map((_, index) => {
        const productNames = [
          "Bluetooth Speaker",
          "USB Type C Cable",
          "LED Desk Lamp",
          "Running Shoes",
          "Car Vacuum Cleaner",
          "Power Drill Machine",
          "Smartphone Tripod",
          "HD Webcam",
          "Portable Power Bank",
          "Electric Kettle",
          "Non Stick Pan",
          "Garden Water Hose",
          "Women Handbag",
          "Winter Hoodie",
          "Car Phone Holder",
          "Motorcycle Helmet",
          "Laptop Stand",
          "External Hard Drive",
          "WiFi Router",
          "Air Fryer",
          "Vacuum Flask",
          "Wall Clock",
          "Tool Box Kit",
          "Safety Gloves",
          "Fitness Dumbbells",
          "Yoga Mat",
          "Sunglasses",
          "Denim Jacket",
          "Car Air Freshener",
          "Bike Lock",
          "Monitor Screen",
          "Graphic Tablet",
          "Mobile Charger",
          "Smart LED Bulb",
          "Electric Iron",
          "Hair Dryer",
          "Storage Organizer",
          "Camping Tent",
          "Screwdriver Set",
          "Portable Fan",
        ];

        const name = productNames[index];
        const slug = name.toLowerCase().replaceAll(" ", "-");

        const categoryIndex =
          index % 6 === 0
            ? 0
            : index % 6 === 1
            ? 4
            : index % 6 === 2
            ? 1
            : index % 6 === 3
            ? 2
            : index % 6 === 4
            ? 3
            : 5;

        return {
          title: name,
          slug,
          category: categories[categoryIndex]._id,
          price: 15 + index * 3,
          oldPrice: 25 + index * 4,
          discount: index % 2 === 0 ? 15 : 10,
          images: [
            `https://placehold.co/400x400?text=${encodeURIComponent(name)}`,
          ],
          rating: Number((4 + (index % 9) / 10).toFixed(1)),
          reviewsCount: 10 + index * 2,
          sold: 30 + index * 5,
          stock: 10 + index,
          description: `${name} with reliable quality and modern design.`,
          brand: ["Apple", "Sony", "Samsung", "Philips", "Logitech", "Generic"][
            index % 6
          ],
          isFeatured: index % 5 === 0,
          isRecommended: index % 4 === 0,
          isDeal: index % 3 === 0,
          supplier: {
            name: [
              "Global Trade Ltd",
              "Smart Supply Co",
              "Urban Wholesale",
              "Premium Exporters",
              "B2B Market Hub",
            ][index % 5],
            country: ["China", "Germany", "Turkey", "Pakistan", "USA"][
              index % 5
            ],
            verified: true,
          },
          shipping: {
            freeShipping: index % 2 === 0,
            deliveryTime: ["5-10 days", "7-14 days", "10-18 days"][index % 3],
            shipsFrom: ["China", "Germany", "Turkey", "Pakistan", "USA"][
              index % 5
            ],
          },
        };
      }),
    ];

    await Product.insertMany(products);

    console.log(`${products.length} products added successfully`);
    process.exit();
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

seedData();