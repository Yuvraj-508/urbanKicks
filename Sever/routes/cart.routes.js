import express from "express";

import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../controlllers/cart.controller.js";

// import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

/* All cart routes require login */

// router.use(protect);

/* Cart */

router.get("/", getCart);

router.post("/", addToCart);

router.patch("/:id", updateCartItem);

router.delete("/:id", removeCartItem);

router.delete("/", clearCart);

export default router;