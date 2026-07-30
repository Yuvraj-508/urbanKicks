import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmptyProducts() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed bg-slate-50 py-24">

      <div className="rounded-full bg-white p-6 shadow">

        <SearchX className="h-12 w-12 text-slate-400" />

      </div>

      <h2 className="mt-8 text-3xl font-bold">
        No Products Found
      </h2>

      <p className="mt-3 max-w-md text-center text-slate-500">
        Try changing your filters or search keywords to
        discover more sneakers.
      </p>

      <Button className="mt-8 rounded-full bg-emerald-600 hover:bg-emerald-700">
        Reset Filters
      </Button>

    </div>
  );
}