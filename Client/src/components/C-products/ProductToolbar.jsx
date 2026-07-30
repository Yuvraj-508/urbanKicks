import { Search, SlidersHorizontal, LayoutGrid, List } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProductToolbar({
  search,
  setSearch,
  sort,
  setSort,
  view,
  setView,
  totalProducts,
  onOpenFilters,
}) {
  return (
    <div className="sticky top-20 z-20 rounded-2xl border bg-white/90 p-4 shadow-sm backdrop-blur">
      {/* Top Row */}

      <div className="flex items-center gap-3">
        {/* Search */}

        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search sneakers..."
            className="h-11 w-full rounded-xl border bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        {/* Filter Button */}

        <Button
          variant="outline"
          size="icon"
          className="h-11 w-11 rounded-xl"
          onClick={onOpenFilters}
        >
          <SlidersHorizontal className="h-5 w-5" />
        </Button>
      </div>

      {/* Bottom Row */}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        {/* Product Count */}

        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-900">
            {totalProducts}
          </span>{" "}
          Products
        </p>

        <div className="flex items-center gap-2">
          {/* Sort */}

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="h-10 w-[170px] rounded-xl">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="popular">Popular</SelectItem>
              <SelectItem value="price-low">
                Price: Low to High
              </SelectItem>
              <SelectItem value="price-high">
                Price: High to Low
              </SelectItem>
              <SelectItem value="rating">
                Top Rated
              </SelectItem>
            </SelectContent>
          </Select>

          {/* View Toggle */}

          <div className="flex overflow-hidden rounded-xl border">
            <Button
              variant={view === "grid" ? "default" : "ghost"}
              size="icon"
              className="h-10 w-10 rounded-none"
              onClick={() => setView("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>

            <Button
              variant={view === "list" ? "default" : "ghost"}
              size="icon"
              className="h-10 w-10 rounded-none"
              onClick={() => setView("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}