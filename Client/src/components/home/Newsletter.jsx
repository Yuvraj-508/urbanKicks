import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Newsletter() {
  return (
    <section className="hidden lg:flex py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-700 p-8 text-white lg:p-16">

          <div className="mx-auto max-w-3xl text-center">

            <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
              NEWSLETTER
            </span>

            <h2 className="mt-6 text-4xl font-black lg:text-5xl">
              Never Miss a Drop
            </h2>

            <p className="mt-5 text-lg text-slate-200">
              Subscribe and get exclusive offers, early access to
              new collections, and special discounts delivered to
              your inbox.
            </p>

            <form className="mx-auto mt-10 flex max-w-2xl flex-col gap-4 sm:flex-row">

              <input
                type="email"
                placeholder="Enter your email"
                className="h-14 flex-1 rounded-full border border-white/20 bg-white px-6 text-slate-900 outline-none"
              />

              <Button
                size="lg"
                className="h-14 rounded-full bg-emerald-600 px-8 hover:bg-emerald-700"
              >
                Subscribe

                <ArrowRight className="ml-2 h-5 w-5" />

              </Button>

            </form>

          </div>

        </div>
      </div>
    </section>
  );
}