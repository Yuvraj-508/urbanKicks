import Product from "../models/Product.js";

export const getDashboard = async (req, res) => {
  try {
    const products = await Product.find().select(
      "name variants active"
    );

    const totalProducts = products.length;

    let totalVariants = 0;
    let totalInventory = 0;

    const lowStockProducts = [];

    products.forEach((product) => {
      product.variants.forEach((variant) => {
        totalVariants++;

        const variantStock = variant.sizes.reduce(
          (sum, size) => sum + size.stock,
          0
        );

        totalInventory += variantStock;

        if (variantStock <= 5) {
          lowStockProducts.push({
            _id: `${product._id}-${variant._id}`,
            productId: product._id,
            name: product.name,
            color: variant.color.name,
            stock: variantStock,
          });
        }
      });
    });

    lowStockProducts.sort((a, b) => a.stock - b.stock);

    return res.status(200).json({
      success: true,

      stats: {
        products: totalProducts,
        variants: totalVariants,
        inventory: totalInventory,
      },

      lowStockProducts: lowStockProducts.slice(0, 5),
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to load dashboard.",
    });
  }
};