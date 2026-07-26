import { ImagePlus, Trash2, Images } from "lucide-react";
import toast from "react-hot-toast";

const MAX_IMAGES = 5;
const MAX_SIZE = 5 * 1024 * 1024;

export default function ImageUploader({
  existingImages = [],
  setExistingImages,
  deletedImages,
  setDeletedImages,
  images,
  setImages,
}) {
  const totalImages = existingImages.length + images.length;

  const MIN_WIDTH = 600;
  const MIN_HEIGHT = 600;


const handleImageChange = async (e) => {
  const files = Array.from(e.target.files);

  if (totalImages + files.length > MAX_IMAGES) {
    toast.error(`Maximum ${MAX_IMAGES} images allowed`);
    e.target.value = "";
    return;
  }

  const validFiles = [];

  for (const file of files) {
    if (!file.type.startsWith("image/")) {
      toast.error(`${file.name} is not a valid image`);
      continue;
    }

    if (file.size > MAX_SIZE) {
      toast.error(`${file.name} exceeds the 5 MB limit`);
      continue;
    }

    try {
      const dimensions = await new Promise((resolve, reject) => {
        const img = new Image();
        const imageUrl = URL.createObjectURL(file);

        img.onload = () => {
          URL.revokeObjectURL(imageUrl);

          resolve({
            width: img.width,
            height: img.height,
          });
        };

        img.onerror = () => {
          URL.revokeObjectURL(imageUrl);
          reject();
        };

        img.src = imageUrl;
      });

      if (
        dimensions.width < MIN_WIDTH ||
        dimensions.height < MIN_HEIGHT
      ) {
        toast.error(
          `${file.name} must be at least ${MIN_WIDTH} × ${MIN_HEIGHT}px`
        );
        continue;
      }

      validFiles.push(file);
    } catch {
      toast.error(`Failed to read ${file.name}`);
    }
  }

  if (validFiles.length) {
    setImages((prev) => [...prev, ...validFiles]);
  }

  e.target.value = "";
};

  const removeExistingImage = (image) => {
    setDeletedImages((prev) => [...prev, image.public_id]);

    setExistingImages((prev) =>
      prev.filter((img) => img.public_id !== image.public_id),
    );
  };

  const removeNewImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header */}

      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Product Images
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Upload up to {MAX_IMAGES} images
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
          <Images className="h-4 w-4" />
          {totalImages}/{MAX_IMAGES}
        </div>
      </div>

      {/* Gallery */}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {/* Upload Card */}

        {totalImages < MAX_IMAGES && (
          <label
            htmlFor="images"
            className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 transition-all hover:border-emerald-500 hover:bg-emerald-50"
          >
            <ImagePlus className="mb-2 h-8 w-8 text-emerald-600" />

            <p className="text-xs font-medium text-slate-700">Add Images</p>

            <input
              id="images"
              hidden
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        )}

        {/* Existing Images */}

        {existingImages.map((image) => (
          <div
            key={image.public_id}
            className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200"
          >
            <img
              src={image.url}
              alt=""
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />

            <button
              type="button"
              onClick={() => removeExistingImage(image)}
              className="absolute right-2 top-2 rounded-lg bg-red-500 p-1.5 text-white opacity-0 shadow transition-all group-hover:opacity-100"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}

        {/* New Images */}

        {images.map((image, index) => (
          <div
            key={index}
            className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200"
          >
            <img
              src={URL.createObjectURL(image)}
              alt=""
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />

            {/* New Badge */}

            <span className="absolute left-2 top-2 rounded-md bg-emerald-600 px-2 py-1 text-[10px] font-medium text-white">
              NEW
            </span>

            <button
              type="button"
              onClick={() => removeNewImage(index)}
              className="absolute right-2 top-2 rounded-lg bg-red-500 p-1.5 text-white opacity-0 shadow transition-all group-hover:opacity-100"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-slate-500">
        Supported formats: PNG, JPG, JPEG • Max size: 5MB • Recommended:
        1200×1200px • Minimum: 600×600px
      </p>
    </div>
  );
}
