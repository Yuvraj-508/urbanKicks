import { Loader2 } from "lucide-react";

export default function PageLoader({
  title = "Loading...",
  subtitle = "Please wait a moment.",
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <div className="rounded-full bg-emerald-100 p-4">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>

      <h2 className="mt-6 text-xl font-bold text-slate-900">
        {title}
      </h2>

      <p className="mt-2 text-center text-sm text-slate-500">
        {subtitle}
      </p>
    </div>
  );
}