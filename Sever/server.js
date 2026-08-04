import express from "express";
import cors from "cors";
import connectDB from "./configs/Db.js";
import "dotenv/config";

import otpRouter from "./routes/otpRoute.js";
import ProductRouter from "./routes/product.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import authRoutes from "./routes/auth.routes.js"; 
import cartRoutes from "./routes/cart.routes.js";
const app = express();
const PORT = process.env.PORT || 4000;

// Connect Database
await connectDB();

// Middleware
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://urban-kickss.vercel.app",
  "http://192.168.1.5:5173"
];

app.use(
  cors({
    origin(origin, callback) {
      // Allow requests with no origin (e.g. Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Urban Kicks API is running",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});
// Test Route
app.get("/", (req, res) => {
  res.send("🚀 Server Running");
});

// Routes
app.use("/api/auth", otpRouter);
app.use("/api/products", ProductRouter);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/cart", cartRoutes);

app.use("/api/auth", authRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});