import { Loader2 } from "lucide-react";

export default function ButtonLoader({
  text = "Loading...",
  size = 18,
}) {
  return (
    <span className="inline-flex items-center justify-center gap-2">
      <Loader2
        size={size}
        className="animate-spin text-current"
        strokeWidth={2.5}
      />

      <span className="font-medium">{text}</span>
    </span>
  );
}