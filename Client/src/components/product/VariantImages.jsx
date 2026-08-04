import { UploadCloud, Trash2, ImagePlus } from "lucide-react";

export default function VariantImages({ images, onChange }) {
  const handleFiles = (files) => {
    if (!files?.length) return;

    const newFiles = Array.from(files);

    onChange([...images, ...newFiles]);
  };

  const removeImage = (index) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h4 className="font-semibold">Variant Images</h4>

          <p className="text-sm text-slate-500">
            Upload images for this color.
          </p>
        </div>

        <label className="cursor-pointer rounded-lg border px-4 py-2 text-sm hover:bg-slate-50">
          Upload
          <input
            hidden
            multiple
            type="file"
            accept="image/*"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>
      </div>

      <label
        className="flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 transition hover:border-emerald-500 hover:bg-emerald-50"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
      >
        <UploadCloud className="mb-4 h-12 w-12 text-slate-400" />

        <p className="font-medium">Drag & Drop Images</p>

        <p className="mt-1 text-sm text-slate-500">or click to browse</p>

        <input
          hidden
          multiple
          type="file"
          accept="image/*"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </label>

      {images.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {images.map((image, index) => {
            const preview =
              image instanceof File ? URL.createObjectURL(image) : image.url;

            return (
              <div
                key={image.public_id || index}
                className="group relative overflow-hidden rounded-xl border bg-white"
              >
                <img
                  src={preview}
                  alt=""
                  className="aspect-square w-full object-cover"
                />

                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute right-2 top-2 rounded-full bg-red-500 p-2 text-white shadow-md transition-opacity md:opacity-0 md:group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            );
          })}

          <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 hover:border-emerald-500 hover:bg-emerald-50">
            <ImagePlus className="h-8 w-8 text-slate-400" />

            <span className="mt-2 text-sm">Add More</span>

            <input
              hidden
              multiple
              type="file"
              accept="image/*"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </label>
        </div>
      )}
    </div>
  );
}
