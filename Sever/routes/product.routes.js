import express from "express";

import { upload } from "../configs/multer.js";

import {
  addProduct,
  getProducts,
  updateStock,
  deleteProduct,
  getProductById,
  updateProduct,
  getRelatedProducts,
  getTrendingProducts,
  // getTrendingProducts,
} from "../controlllers/product.controller.js";

// import authSeller from "../middleware/authSeller.js";

const router = express.Router();

router.post(
  "/",
  // authSeller,
  upload.any(),
  addProduct,
);

router.get("/", getProducts);
router.get("/trending", getTrendingProducts);
router.get("/related/:id", getRelatedProducts);

router.get("/:id", getProductById);

router.put("/:id", upload.any(), updateProduct);

router.delete(
  "/:id",
  // authSeller,
  deleteProduct,
);

router.patch(
  "/:id/stock",
  // authSeller,
  updateStock,
);

export default router;
