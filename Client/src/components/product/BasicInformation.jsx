import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const categories = [
  "running",
  "sneakers",
  "casual",
  "sports",
  "boots",
  "slippers",
];

const genders = [
  {
    value: "men",
    label: "Men",
  },
  {
    value: "women",
    label: "Women",
  },
  {
    value: "unisex",
    label: "Unisex",
  },
];

export default function BasicInformation({
  product,
  setProduct,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Basic Information
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Enter the primary information about your product.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm font-medium">
            Product Name
          </label>

          <Input
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Nike Air Max 270"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Brand
          </label>

          <Input
            name="brand"
            value={product.brand}
            onChange={handleChange}
            placeholder="Nike"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Category
          </label>

          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="">
              Select Category
            </option>

            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Gender
          </label>

          <select
            name="gender"
            value={product.gender}
            onChange={handleChange}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
          >
            {genders.map((gender) => (
              <option
                key={gender.value}
                value={gender.value}
              >
                {gender.label}
              </option>
            ))}
          </select>
        </div>

      </div>

      <div className="mt-5">

        <label className="mb-2 block text-sm font-medium">
          Description
        </label>

        <Textarea
          rows={6}
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Describe your product..."
          className="resize-none"
        />

      </div>

    </section>
  );
}