import { Loader2 } from "lucide-react";

export default function ButtonLoader({
  text = "Loading...",
  size = 18,
}) {
  return (
    <span className="flex items-center justify-center gap-2">
      <Loader2
        size={size}
        className="animate-spin"
      />
      <span>{text}</span>
    </span>
  );
}