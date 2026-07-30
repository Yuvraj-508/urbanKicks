import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

/* -------------------- Get Cart -------------------- */

export const getCart = async (req, res) => {
  try {
    const GUEST_SESSION = "guest";
    const cart = await Cart.findOne({
   sessionId: "guest"
    }).populate({
      path: "items.product",
      select: "name brand price offerPrice images stock inStock",
    });

    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: {
          items: [],
        },
      });
    }

    return res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch cart.",
    });
  }
};

/* -------------------- Add To Cart -------------------- */

export const addToCart = async (req, res) => {
  console.log(req.body);
  try {
    const { productId, quantity, size, color } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    if (!product.inStock || product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: "Product is out of stock.",
      });
    }

    const GUEST_SESSION = "guest";

    let cart = await Cart.findOne({
      sessionId: GUEST_SESSION,
    });

    if (!cart) {
      cart = await Cart.create({
        sessionId: GUEST_SESSION,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.size === size &&
        item.color === color,
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        size,
        color,
      });
    }

    await cart.save();

    await cart.populate({
      path: "items.product",
      select: "name brand price offerPrice images stock inStock",
    });

    return res.status(200).json({
      success: true,
      message: "Product added to cart.",
      cart,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to add product to cart.",
    });
  }
};

/* -------------------- Update Quantity -------------------- */

export const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({
 sessionId: "guest"
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found.",
      });
    }

    const item = cart.items.id(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found.",
      });
    }

    item.quantity = quantity;

    await cart.save();

    await cart.populate({
      path: "items.product",
      select: "name brand price offerPrice images stock inStock",
    });

    return res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update cart.",
    });
  }
};

/* -------------------- Remove Item -------------------- */

export const removeCartItem = async (req, res) => {
  try {
    const { id } = req.params;

    const cart = await Cart.findOne({
 sessionId: "guest"
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found.",
      });
    }

    cart.items.pull(id);

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Item removed from cart.",
      cart,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to remove item.",
    });
  }
};

/* -------------------- Clear Cart -------------------- */

export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
sessionId: "guest"
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found.",
      });
    }

    cart.items = [];

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Cart cleared.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to clear cart.",
    });
  }
};
