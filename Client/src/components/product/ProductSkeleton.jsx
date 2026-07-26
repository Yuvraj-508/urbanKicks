export default function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="aspect-square animate-pulse bg-slate-200" />

      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <div className="h-3 w-20 animate-pulse rounded bg-slate-200" />
          <div className="h-5 w-40 animate-pulse rounded bg-slate-200" />
          <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
        </div>

        <div className="flex justify-between">
          <div className="h-6 w-24 animate-pulse rounded bg-slate-200" />
          <div className="h-6 w-14 animate-pulse rounded bg-slate-200" />
        </div>

        <div className="flex gap-2">
          <div className="h-8 flex-1 animate-pulse rounded bg-slate-200" />
          <div className="h-8 flex-1 animate-pulse rounded bg-slate-200" />
          <div className="h-8 w-10 animate-pulse rounded bg-slate-200" />
        </div>
      </div>
    </div>
  );
}