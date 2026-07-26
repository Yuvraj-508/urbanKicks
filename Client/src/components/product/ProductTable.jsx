import ProductRow from "./ProductRow";

export default function ProductTable({
  products,
  onDelete,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Desktop */}

      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="border-b bg-slate-50">
            <tr className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              <th className="px-5 py-4 w-24">Image</th>

              <th className="px-5 py-4 min-w-[260px]">
                Product
              </th>

              <th className="px-5 py-4">
                Price
              </th>

              <th className="px-5 py-4">
                Sizes
              </th>

              <th className="px-5 py-4">
                Colors
              </th>

              <th className="px-5 py-4 text-center">
                Qty
              </th>

              <th className="px-5 py-4 text-center">
                Status
              </th>

              <th className="px-5 py-4 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <ProductRow
                key={product._id}
                product={product}
                onDelete={onDelete}
                mobile={false}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}

      <div className="divide-y lg:hidden">
        {products.map((product) => (
          <ProductRow
            key={product._id}
            product={product}
            onDelete={onDelete}
            mobile
          />
        ))}
      </div>
    </div>
  );
}