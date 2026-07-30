import { SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import FilterSidebar from "./FilterSidebar";

export default function MobileFilters() {
  return (
    <Sheet>

      <SheetTrigger asChild>

        <Button
          variant="outline"
          className="lg:hidden"
        >
          <SlidersHorizontal className="mr-2 h-5 w-5" />

          Filters

        </Button>

      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-80 overflow-y-auto"
      >

        <SheetHeader>

          <SheetTitle>
            Filters
          </SheetTitle>

        </SheetHeader>

        <div className="mt-6">

          <FilterSidebar />

        </div>

      </SheetContent>

    </Sheet>
  );
}