import express from "express";
import { sellerLogin } from "../controlllers/auth.controller.js";

const router = express.Router();

router.post("/seller/login", sellerLogin);

export default router;