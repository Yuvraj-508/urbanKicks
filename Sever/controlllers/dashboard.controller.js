import Product from "../models/Product.js";

export const getDashboard = async (req, res) => {
  try {
    const [totalProducts, lowStockProducts] = await Promise.all([
      Product.countDocuments(),

      Product.find({
        stock: { $lte: 5 },
      })
        .sort({ stock: 1 })
        .limit(5)
        .select("name stock"),
    ]);

    return res.status(200).json({
      success: true,

      stats: {
        products: totalProducts,
      },

      lowStockProducts,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to load dashboard.",
    });
  }
};