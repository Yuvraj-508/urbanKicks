import { MessageSquare } from "lucide-react";

export default function ReviewInput({
  review,
  setReview,
}) {
  return (
    <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-lg">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-emerald-600" />

        <h2 className="text-xl font-bold">
          Tell us more
        </h2>
      </div>

      <textarea
        rows={6}
        maxLength={500}
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="How was the comfort, quality, fit and overall experience?"
        className="mt-5 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 outline-none transition focus:border-emerald-500 focus:bg-white"
      />

      <div className="mt-3 flex justify-between text-sm">
        <span className="text-slate-400">
          Minimum 20 characters recommended
        </span>

        <span className="font-semibold text-emerald-600">
          {review.length}/500
        </span>
      </div>
    </div>
  );
}