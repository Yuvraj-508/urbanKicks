import Product from "../models/Product.js";
import cloudinary from "../configs/cloudinary.js";
import fs from "fs/promises";

export const addProduct = async (req, res) => {
  const uploadedImages = [];

  try {
    console.log("Body:", req.body);
    console.log("Files:", req.files);

    const {
      name,
      description,
      brand,
      category,
      price,
      offerPrice,
      stock,
    } = req.body;

    // ===========================
    // Validation
    // ===========================
    if (
      !name?.trim() ||
      !brand?.trim() ||
      !category?.trim() ||
      price == null ||
      offerPrice == null
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const sizes = req.body.sizes ? JSON.parse(req.body.sizes) : [];
    const colors = req.body.colors ? JSON.parse(req.body.colors) : [];

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please upload at least one product image.",
      });
    }

    // ===========================
    // Upload Images
    // ===========================
    const images = await Promise.all(
      req.files.map(async (file) => {
        try {
          console.log("Uploading:", file.path);

          const result = await cloudinary.uploader.upload(file.path);

          uploadedImages.push(result.public_id);

          return {
            url: result.secure_url,
            public_id: result.public_id,
          };
        } finally {
          // Delete temp file even if upload fails
          await fs.unlink(file.path).catch(() => {});
        }
      })
    );

    // ===========================
    // Create Product
    // ===========================
    const product = await Product.create({
      name: name.trim(),
      description: description?.trim() || "",
      brand: brand.trim(),
      category: category.trim(),
      price: Number(price),
      offerPrice: Number(offerPrice),
      stock: Number(stock) || 0,
      inStock: Number(stock) > 0,
      sizes,
      colors,
      images,
    });

    return res.status(201).json({
      success: true,
      message: "Product added successfully.",
      product,
    });
  } catch (error) {
    // ===========================
    // Rollback uploaded images
    // ===========================
    if (uploadedImages.length) {
      await Promise.all(
        uploadedImages.map((publicId) =>
          cloudinary.uploader.destroy(publicId).catch(() => {})
        )
      );
    }

    // ===========================
    // Debug Logs
    // ===========================
    console.error("========== ADD PRODUCT ERROR ==========");
    console.error("Name:", error.name);
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);

    if (error.errors) {
      console.error("Validation Errors:");
      console.error(error.errors);
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to add product.",
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", category } = req.query;

    const filter = {};

    // Search by product name
    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    // Category Filter
    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .select("-__v");

    const totalProducts = await Product.countDocuments(filter);

    return res.status(200).json({
      success: true,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: Number(page),
      products,
    });
  } catch (error) {
    console.log(error);

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

    await Promise.all(
      product.images.map((img) => cloudinary.uploader.destroy(img.public_id)),
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
    console.log(error);

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

    const { name, description, brand, category, price, offerPrice, stock } =
      req.body;

    const sizes = req.body.sizes ? JSON.parse(req.body.sizes) : [];

    const colors = req.body.colors ? JSON.parse(req.body.colors) : [];

    const existingImages = req.body.existingImages
      ? JSON.parse(req.body.existingImages)
      : [];

    const deletedImages = req.body.deletedImages
      ? JSON.parse(req.body.deletedImages)
      : [];

    // Delete removed images from Cloudinary
    if (deletedImages.length) {
      await Promise.all(
        deletedImages.map((img) => cloudinary.uploader.destroy(img.public_id)),
      );
    }

    // Upload new images
    const newImages = await Promise.all(
      (req.files || []).map(async (file) => {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: "shoe-store/products",
          });

          uploadedImages.push(result.public_id);

          return {
            url: result.secure_url,
            public_id: result.public_id,
          };
        } finally {
          await fs.unlink(file.path).catch(() => {});
        }
      }),
    );

    product.name = name.trim();
    product.description = description?.trim() || "";
    product.brand = brand;
    product.category = category;
    product.price = Number(price);
    product.offerPrice = Number(offerPrice);
    product.stock = Number(stock);
    product.inStock = Number(stock) > 0;

    product.sizes = sizes;
    product.colors = colors;

    product.images = [...existingImages, ...newImages];

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      product,
    });
  } catch (error) {
    // Roll back newly uploaded images if save fails
    if (uploadedImages.length) {
      await Promise.all(
        uploadedImages.map((id) =>
          cloudinary.uploader.destroy(id).catch(() => {}),
        ),
      );
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update product.",
    });
  }
};
