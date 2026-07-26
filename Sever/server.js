import express from "express";
import cors from "cors";
import connectDB from "./configs/Db.js";
import "dotenv/config";

import otpRouter from "./routes/otpRoute.js";
import ProductRouter from "./routes/product.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import authRoutes from "./routes/auth.routes.js"; 
const app = express();
const PORT = process.env.PORT || 4000;

// Connect Database
connectDB();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 Server Running");
});

// Routes
app.use("/api/auth", otpRouter);
app.use("/api/products", ProductRouter);
app.use("/api/dashboard", dashboardRoutes);

app.use("/api/auth", authRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});