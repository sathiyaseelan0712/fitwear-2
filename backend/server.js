const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const logger = require("morgan");
const connectDB = require("./config/db.js");

// const productRoutes = require('./routes/productRoutes.js');
// const cartRoutes = require('./routes/cartRoutes.js');
// const orderRoutes = require('./routes/orderRoutes.js');
const authRouter = require("./routes/authRouter.js");

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(logger("dev"));

// Routes
app.use("/api/auth", authRouter);
// app.use('/api/products', productRoutes);
// app.use('/api/cart', cartRoutes);
// app.use('/api/orders', orderRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
