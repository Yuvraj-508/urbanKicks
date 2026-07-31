import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function SeoSection({
  product,
  setProduct,
}) {
  const updateSeo = (
    field,
    value
  ) => {
    setProduct((prev) => ({
      ...prev,

      seo: {
        ...prev.seo,
        [field]: value,
      },
    }));
  };

  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">

      <h2 className="mb-5 text-lg font-semibold">
        SEO
      </h2>

      <div className="space-y-5">

        <div>

          <label className="mb-2 block text-sm">
            SEO Title
          </label>

          <Input
            value={product.seo.title}
            onChange={(e) =>
              updateSeo(
                "title",
                e.target.value
              )
            }
          />

        </div>

        <div>

          <label className="mb-2 block text-sm">
            Meta Description
          </label>

          <Textarea
            rows={4}
            value={
              product.seo.description
            }
            onChange={(e) =>
              updateSeo(
                "description",
                e.target.value
              )
            }
          />

        </div>

        <div>

          <label className="mb-2 block text-sm">
            Keywords
          </label>

          <Input
            placeholder="running,nike,air max"
            value={product.seo.keywords.join(",")}
            onChange={(e) =>
              updateSeo(
                "keywords",
                e.target.value
                  .split(",")
                  .map((k) => k.trim())
                  .filter(Boolean)
              )
            }
          />

        </div>

      </div>

    </section>
  );
}