import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const sellerLogin = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    const identifier = emailOrPhone?.trim();
    const userPassword = password?.trim();

    if (!identifier || !userPassword) {
      return res.status(400).json({
        success: false,
        message: "Email/Phone and Password are required.",
      });
    }

    const {
      SELLER_EMAIL,
      SELLER_PHONE,
      SELLER_PASSWORD_HASH,
      JWT_SECRET,
    } = process.env;

    const isValidUser =
      identifier.toLowerCase() === SELLER_EMAIL.toLowerCase() ||
      identifier === SELLER_PHONE;

    if (!isValidUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid email/phone or password.",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      userPassword,
      SELLER_PASSWORD_HASH
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email/phone or password.",
      });
    }

    const token = jwt.sign(
      {
        role: "seller",
        email: SELLER_EMAIL,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      seller: {
        name: "Urban Kicks",
        email: SELLER_EMAIL,
        phone: SELLER_PHONE,
      },
    });
  } catch (error) {
    console.error("Seller Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};