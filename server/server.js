const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routes/auth");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// DB CONNECT
connectDB();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});