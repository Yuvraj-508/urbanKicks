import { ImagePlus, X } from "lucide-react";

export default function PhotoUploader({
  photos,
  setPhotos,
}) {
  const handleChange = (e) => {
    const files = Array.from(e.target.files);

    const preview = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setPhotos([...photos, ...preview].slice(0, 5));
  };

  const removePhoto = (index) => {
    const updated = [...photos];

    updated.splice(index, 1);

    setPhotos(updated);
  };

  return (
    <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-lg">
      <h2 className="text-xl font-bold">
        Add Photos
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Show other customers your sneakers.
      </p>

      <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-emerald-300 bg-emerald-50 py-10 transition hover:bg-emerald-100">
        <ImagePlus className="h-10 w-10 text-emerald-600" />

        <span className="mt-4 font-semibold">
          Upload Photos
        </span>

        <span className="mt-1 text-sm text-slate-500">
          PNG, JPG, WEBP
        </span>

        <input
          multiple
          type="file"
          accept="image/*"
          hidden
          onChange={handleChange}
        />
      </label>

      {photos.length > 0 && (
        <div className="mt-6 grid grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl"
            >
              <img
                src={photo.url}
                alt=""
                className="aspect-square w-full object-cover"
              />

              <button
                onClick={() => removePhoto(index)}
                className="absolute right-2 top-2 rounded-full bg-black/70 p-1 text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}