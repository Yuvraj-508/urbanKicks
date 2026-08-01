import fs from "fs/promises";
import Product from "../models/Product.js";
import cloudinary from "../configs/cloudinary.js";

export const addProduct = async (req, res) => {
  // rest of your code...
 const uploadedImages = [];
  try {
    const {
      name,
      description,
      brand,
      category,
      gender,
      price,
      offerPrice,
      featured,
      bestseller,
      newArrival,
      sale,
      active,
    } = req.body;

    const tags = req.body.tags ? JSON.parse(req.body.tags) : [];

    const variants = req.body.variants
      ? JSON.parse(req.body.variants)
      : [];

    // ==========================
    // Validation
    // ==========================

    if (
      !name?.trim() ||
      !brand?.trim() ||
      !category?.trim() ||
      price === undefined ||
      offerPrice === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    if (!variants.length) {
      return res.status(400).json({
        success: false,
        message: "Please add at least one variant.",
      });
    }


    // ==========================
    // Group Files By Variant
    // ==========================

    const groupedFiles = {};

    for (const file of req.files || []) {
      if (!groupedFiles[file.fieldname]) {
        groupedFiles[file.fieldname] = [];
      }

      groupedFiles[file.fieldname].push(file);
    }

    // ==========================
    // Upload Images
    // ==========================

    for (let i = 0; i < variants.length; i++) {
      const variant = variants[i];

if (!variant.color?.name?.trim()) {
  return res.status(400).json({
    success: false,
    message: "Variant name is required.",
  });
}

if (
  !Array.isArray(variant.color?.swatches) ||
  variant.color.swatches.length === 0
) {
  return res.status(400).json({
    success: false,
    message: `${variant.color?.name || "Variant"} needs at least one color.`,
  });
}

for (const swatch of variant.color.swatches) {
  if (!swatch.name?.trim()) {
    return res.status(400).json({
      success: false,
      message: `${variant.color.name} has an invalid color name.`,
    });
  }

  if (!swatch.value) {
    return res.status(400).json({
      success: false,
      message: `${variant.color.name} has an invalid color value.`,
    });
  }
}
    if (
  !Array.isArray(variant.sizes) ||
  variant.sizes.length === 0
) {
  return res.status(400).json({
    success: false,
    message: `${variant.color.name} must have at least one size.`,
  });
}

for (const size of variant.sizes) {
  if (!size.size?.trim()) {
    return res.status(400).json({
      success: false,
      message: `${variant.color.name} contains an invalid size.`,
    });
  }

  if (Number(size.stock) < 0) {
    return res.status(400).json({
      success: false,
      message: `${variant.color.name} contains an invalid stock quantity.`,
    });
  }
}

      const files = groupedFiles[`variantImages_${i}`] || [];

      if (!files.length) {
        return res.status(400).json({
          success: false,
          message: `Variant ${variant.color.name} must have at least one image.`,
        });
      }

      const images = [];

      for (const file of files) {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: "urban-kicks/products",
          });

          uploadedImages.push(result.public_id);

          images.push({
            url: result.secure_url,
            public_id: result.public_id,
            alt: `${name} ${variant.color.name}`,
          });
        } finally {
          await fs.unlink(file.path).catch(() => {});
        }
      }

      variant.images = images;

      variant.inStock = variant.sizes.some(
        (size) => Number(size.stock) > 0
      );
    }

    // ==========================
    // Create Product
    // ==========================

    const product = await Product.create({
      name: name.trim(),
      description: description?.trim() || "",
      brand: brand.trim(),
      category: category.trim(),
      gender,

      price: Number(price),
      offerPrice: Number(offerPrice),

      featured: featured === "true",
      bestseller: bestseller === "true",
      newArrival: newArrival === "true",
      sale: sale === "true",
      active: active === "true",

      tags,
      variants,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully.",
      product,
    });
  } catch (error) {
    // ==========================
    // Rollback Uploaded Images
    // ==========================

    await Promise.all(
      uploadedImages.map((publicId) =>
        cloudinary.uploader.destroy(publicId).catch(() => {})
      )
    );

    console.error("ADD PRODUCT ERROR");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create product.",
    });
  }
};


export const getProducts = async (req, res) => {
  try {
const {
  page = 1,
  limit = 10,
  search = "",
  category,
  brand,
  sort = "newest",
  minPrice,
  maxPrice,
  color,
  size,
  active,
  bestseller,
} = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const filter = {};

    // Search
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    // Category
    if (category) {
      filter.category = {
        $in: category.split(","),
      };
    }

    // Brand
    if (brand) {
      filter.brand = {
        $in: brand.split(","),
      };
    }

    // Product Status
    if (active === "true") {
      filter.active = true;
    }

    if (active === "false") {
      filter.active = false;
    }
// Bestseller
if (bestseller === "true") {
  filter.bestseller = true;
}
    // Variant Color
    if (color) {
      filter["variants.color.name"] = {
        $in: color.split(","),
      };
    }

    // Variant Size
    if (size) {
      filter["variants.sizes.size"] = {
        $in: size.split(","),
      };
    }

    // Price Filter
    if (minPrice || maxPrice) {
      filter.offerPrice = {};

      if (minPrice) filter.offerPrice.$gte = Number(minPrice);
      if (maxPrice) filter.offerPrice.$lte = Number(maxPrice);
    }

    // Sorting
    let sortOption = {};

    switch (sort) {
      case "price-low":
        sortOption = { offerPrice: 1 };
        break;

      case "price-high":
        sortOption = { offerPrice: -1 };
        break;

      case "name-asc":
        sortOption = { name: 1 };
        break;

      case "name-desc":
        sortOption = { name: -1 };
        break;

      default:
        sortOption = { createdAt: -1 };
    }

    const [products, totalProducts] = await Promise.all([
      Product.find(filter)
        .sort(sortOption)
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber)
        .lean(),

      Product.countDocuments(filter),
    ]);

const formattedProducts = products.map((product) => {
  const variants = product.variants || [];

  const totalStock = variants.reduce((productTotal, variant) => {
    return (
      productTotal +
      (variant.sizes || []).reduce(
        (variantTotal, size) => variantTotal + (size.stock || 0),
        0
      )
    );
  }, 0);

  return {
    ...product,
    image: variants[0]?.images?.[0]?.url || "",
    totalStock,
    inStock: totalStock > 0,
    totalVariants: variants.length,
  };
});

    return res.status(200).json({
      success: true,
      products: formattedProducts,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limitNumber),
      currentPage: pageNumber,
    });
  } catch (error) {
    console.error("Get Products Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch products.",
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    const publicIds = product.variants.flatMap((variant) =>
      variant.images.map((img) => img.public_id)
    );

    await Promise.all(
      publicIds.map((id) =>
        cloudinary.uploader.destroy(id)
      )
    );

    await product.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};
export const updateStock = async (req, res) => {
  try {
    const { inStock } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    product.inStock = inStock;

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Stock updated successfully.",
      product,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update stock.",
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch product.",
    });
  }
};


export const updateProduct = async (req, res) => {
  const uploadedImages = [];

  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    const {
      name,
      description,
      brand,
      category,
      gender,
      price,
      offerPrice,
      featured,
      bestseller,
      newArrival,
      sale,
      active,
    } = req.body;

    const tags = req.body.tags ? JSON.parse(req.body.tags) : [];

    const variants = req.body.variants
      ? JSON.parse(req.body.variants)
      : [];

    // ==========================
    // Validation
    // ==========================

    if (
      !name?.trim() ||
      !brand?.trim() ||
      !category?.trim() ||
      price === undefined ||
      offerPrice === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    if (!variants.length) {
      return res.status(400).json({
        success: false,
        message: "Please add at least one variant.",
      });
    }

    // ==========================
    // Group Uploaded Files
    // ==========================

    const groupedFiles = {};

    for (const file of req.files || []) {
      if (!groupedFiles[file.fieldname]) {
        groupedFiles[file.fieldname] = [];
      }

      groupedFiles[file.fieldname].push(file);
    }

    // ==========================
    // Delete Removed Images
    // ==========================

    const oldPublicIds = product.variants.flatMap((variant) =>
      variant.images.map((img) => img.public_id)
    );

    const existingPublicIds = variants.flatMap((variant) =>
      (variant.images || []).map((img) => img.public_id)
    );

    const removedImages = oldPublicIds.filter(
      (id) => !existingPublicIds.includes(id)
    );

    await Promise.all(
      removedImages.map((id) =>
        cloudinary.uploader.destroy(id).catch(() => {})
      )
    );

    // ==========================
    // Upload New Images
    // ==========================

    for (let i = 0; i < variants.length; i++) {
      const variant = variants[i];

      if (!variant.color?.name?.trim()) {
        return res.status(400).json({
          success: false,
          message: `Variant ${i + 1} must have a color.`,
        });
      }

      if (!variant.sizes?.length) {
        return res.status(400).json({
          success: false,
          message: `Variant ${variant.color.name} must have at least one size.`,
        });
      }

      const files = groupedFiles[`variantImages_${i}`] || [];

      const uploadedVariantImages = [];

      for (const file of files) {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: "urban-kicks/products",
          });

          uploadedImages.push(result.public_id);

          uploadedVariantImages.push({
            url: result.secure_url,
            public_id: result.public_id,
            alt: `${name} ${variant.color.name}`,
          });
        } finally {
          await fs.unlink(file.path).catch(() => {});
        }
      }

      variant.images = [
        ...(variant.images || []),
        ...uploadedVariantImages,
      ];

      variant.inStock = variant.sizes.some(
        (size) => Number(size.stock) > 0
      );
    }

    // ==========================
    // Update Product
    // ==========================

    product.name = name.trim();
    product.description = description?.trim() || "";
    product.brand = brand.trim();
    product.category = category.trim();
    product.gender = gender;

    product.price = Number(price);
    product.offerPrice = Number(offerPrice);

    product.featured = featured === "true";
    product.bestseller = bestseller === "true";
    product.newArrival = newArrival === "true";
    product.sale = sale === "true";
    product.active = active === "true";

    product.tags = tags;
    product.variants = variants;

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      product,
    });
  } catch (error) {
    // ==========================
    // Rollback Uploaded Images
    // ==========================

    await Promise.all(
      uploadedImages.map((publicId) =>
        cloudinary.uploader.destroy(publicId).catch(() => {})
      )
    );

    console.error("UPDATE PRODUCT ERROR");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update product.",
    });
  }
};

export const getRelatedProducts = async (req, res) => {

  try {

    const { id } = req.params;
    const { limit = 4 } = req.query;

    // Find current product
    const currentProduct = await Product.findById(id);

    if (!currentProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Find related products
    const products = await Product.find({
      _id: { $ne: id }, // Exclude current product
      category: currentProduct.category,
      inStock: true,
    })
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .select("-__v");

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch related products.",
    });
  }
};

export const getTrendingProducts = async (req, res) => {
  try {
    const products = await Product.find({
      bestseller: true,
      active: true,
    })
      .sort({ createdAt: -1 })
      .limit(4)
      .lean();

    const formattedProducts = products.map((product) => {
      const variants = product.variants || [];

      const totalStock = variants.reduce((productTotal, variant) => {
        return (
          productTotal +
          (variant.sizes || []).reduce(
            (variantTotal, size) =>
              variantTotal + (size.stock || 0),
            0
          )
        );
      }, 0);

      return {
        ...product,

        image: variants[0]?.images?.[0]?.url || "",

        totalStock,

        inStock: totalStock > 0,

        totalVariants: variants.length,
      };
    });

    return res.status(200).json({
      success: true,
      products: formattedProducts,
    });
  } catch (error) {
    console.error("Get Trending Products Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch trending products.",
    });
  }
};