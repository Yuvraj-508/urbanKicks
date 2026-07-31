import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },

    public_id: {
      type: String,
      required: true,
      trim: true,
    },

    alt: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { _id: false }
);

const sizeSchema = new mongoose.Schema(
  {
    size: {
      type: String,
      required: true,
      trim: true,
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    sku: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { _id: false }
);

const variantSchema = new mongoose.Schema(
  {
 color: {
  name: {
    type: String,
    required: true,
    trim: true,
    // e.g. "Yellow / Black"
  },

  swatches: [
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      value: {
        type: String,
        required: true,
      },
    },
  ],
},

    sku: {
      type: String,
      default: "",
      trim: true,
    },

    sizes: {
      type: [sizeSchema],
      validate: {
        validator: (arr) =>
          Array.isArray(arr) && arr.length > 0,
        message: "At least one size is required.",
      },
    },

    images: {
      type: [imageSchema],
      validate: {
        validator: (arr) =>
          Array.isArray(arr) && arr.length > 0,
        message: "At least one image is required.",
      },
    },

    inStock: {
      type: Boolean,
      default: true,
    },
  },
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

    gender: {
      type: String,
      enum: ["men", "women", "unisex"],
      default: "unisex",
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
      validate: {
        validator(value) {
          return value <= this.price;
        },
        message:
          "Offer price cannot be greater than price.",
      },
    },

    variants: {
      type: [variantSchema],
      validate: {
        validator: (arr) =>
          Array.isArray(arr) && arr.length > 0,
        message: "At least one variant is required.",
      },
    },

    tags: {
      type: [String],
      default: [],
    },

    featured: {
      type: Boolean,
      default: false,
    },

    bestseller: {
      type: Boolean,
      default: false,
    },

    newArrival: {
      type: Boolean,
      default: false,
    },

    sale: {
      type: Boolean,
      default: false,
    },

    active: {
      type: Boolean,
      default: true,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalSold: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual Total Stock
productSchema.virtual("totalStock").get(function () {
  return this.variants.reduce((total, variant) => {
    return (
      total +
      variant.sizes.reduce(
        (sum, size) => sum + size.stock,
        0
      )
    );
  }, 0);
});

// Text Search
productSchema.index({
  name: "text",
  description: "text",
  brand: "text",
  category: "text",
});

// Query Indexes
productSchema.index({ brand: 1 });
productSchema.index({ category: 1 });
productSchema.index({ gender: 1 });
productSchema.index({ featured: 1 });
productSchema.index({ bestseller: 1 });
productSchema.index({ newArrival: 1 });
productSchema.index({ sale: 1 });
productSchema.index({ active: 1 });
productSchema.index({ offerPrice: 1 });

export default mongoose.model("Product", productSchema);