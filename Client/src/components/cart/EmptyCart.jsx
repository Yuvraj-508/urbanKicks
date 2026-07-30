import { ShoppingBag } from "lucide-react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";

export default function EmptyCart() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center">

      <div className="text-center">

        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-slate-100">

          <ShoppingBag className="h-14 w-14 text-slate-400" />

        </div>

        <h1 className="mt-8 text-4xl font-black">
          Your Cart is Empty
        </h1>

        <p className="mt-3 text-slate-500">
          Looks like you haven't added anything yet.
        </p>

        <Link to="/all-products">

          <Button className="mt-8 h-12 rounded-xl bg-emerald-600 px-8 hover:bg-emerald-700">
            Continue Shopping
          </Button>

        </Link>

      </div>

    </section>
  );
}