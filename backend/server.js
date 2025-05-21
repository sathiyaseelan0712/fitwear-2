const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const logger = require("morgan");
const { connectDB } = require("./config/db.js");
const path = require('path');

const authRouter = require("./routes/authRouter.js");
const productRoutes = require("./routes/productRoutes");

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(logger("dev"));

app.use('/public', express.static(path.join(__dirname, 'public')));

// Routes
app.use((req, res, next) => {
  console.log('Received Content-Type:', req.headers['content-type']);
  next();
});

app.use("/api/auth", authRouter);
app.use("/api/products", productRoutes); 




const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
