import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    offerPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    inStock: {
      type: Boolean,
      default: true,
    },

   colors: [
  {
    name: {
      type: String,
      required: true,
    },

    value: {
      type: String,
      required: true,
    },

    custom: {
      type: Boolean,
      default: false,
    },
  },
],

   sizes: {
  type: [String],
  default: [],
},

    images: {
      type: [imageSchema],
      validate: [(arr) => arr.length > 0, "At least one image is required"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);