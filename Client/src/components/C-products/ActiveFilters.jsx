import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const filters = [
  "Nike",
  "Running",
  "Black",
  "₹2,000 - ₹5,000",
];

export default function ActiveFilters() {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">

      {filters.map((filter) => (
        <Button
          key={filter}
          variant="secondary"
          className="rounded-full"
        >
          {filter}

          <X className="ml-2 h-4 w-4" />
        </Button>
      ))}

      <Button
        variant="ghost"
        className="text-red-500 hover:text-red-600"
      >
        Clear All
      </Button>

    </div>
  );
}