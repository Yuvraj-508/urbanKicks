import express from "express";

import { upload } from "../configs/multer.js";

import {
  addProduct,
  getProducts,
  updateStock,
  deleteProduct,
  getProductById,
  updateProduct,
} from "../controlllers/product.controller.js";

// import authSeller from "../middleware/authSeller.js";

const router = express.Router();

router.post(
  "/",
//   authSeller,
  upload.array("images", 5),
  addProduct
);

router.get("/", getProducts);

router.get("/:id", getProductById);

router.put(
  "/:id",
//   authSeller,
  upload.array("images", 5),
  updateProduct
);

router.delete("/:id", 
    // authSeller,
     deleteProduct);

router.patch("/:id/stock", 
    // authSeller,
     updateStock);

export default router;