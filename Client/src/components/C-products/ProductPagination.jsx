import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductPagination({
  pagination,
  onPageChange,
}) {
  if (!pagination?.totalPages || pagination.totalPages <= 1) {
    return null;
  }

  const {
    currentPage,
    totalPages,
  } = pagination;

  return (
    <div className="flex items-center justify-center gap-2">

      <Button
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {Array.from(
        { length: totalPages },
        (_, i) => i + 1
      ).map((page) => (

        <Button
          key={page}
          variant={
            page === currentPage
              ? "default"
              : "outline"
          }
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>

      ))}

      <Button
        variant="outline"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

    </div>
  );
}