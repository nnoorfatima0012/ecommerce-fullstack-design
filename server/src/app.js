const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const notFoundMiddleware = require("./middleware/notFound.middleware");
const errorMiddleware = require("./middleware/error.middleware");
const productRoutes = require("./features/products/product.routes");
const categoryRoutes = require("./features/categories/category.routes");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "B2B Ecommerce API is running",
  });
});

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;