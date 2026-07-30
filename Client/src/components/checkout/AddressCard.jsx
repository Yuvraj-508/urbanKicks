import { useState } from "react";
import { MapPin, Plus, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";

import AddressDialog from "./AddressDialog";

export default function AddressCard({
  address,
  setAddress,
}) {  const [open, setOpen] = useState(false);


  return (
    <>
      <div className="rounded-2xl border bg-white p-6 shadow-sm">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100">
              <MapPin className="h-5 w-5 text-emerald-600" />
            </div>

            <div>

              <h2 className="text-xl font-bold">
                Delivery Address
              </h2>

              <p className="text-sm text-slate-500">
                Delivering to
              </p>

            </div>

          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Address
          </Button>

        </div>

        <div className="mt-6 rounded-xl border bg-slate-50 p-5">

          <div className="flex items-start justify-between">

            <div>
  {address ? (
    <>
      <h3 className="font-semibold">
        {address.name}
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        {address.phone}
      </p>

      <p className="mt-3 text-sm text-slate-600">
        {address.address}
        <br />
        {address.city}, {address.state}
        <br />
        {address.pincode}
      </p>
    </>
  ) : (
    <>
      <h3 className="font-semibold text-slate-700">
        No delivery address
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        Add a delivery address to continue with your order.
      </p>
    </>
  )}
</div>

          {address && (
  <Button
    variant="ghost"
    size="icon"
    onClick={() => setOpen(true)}
  >
    <Pencil className="h-4 w-4" />
  </Button>
)}

          </div>

        </div>

      </div>

      <AddressDialog
        open={open}
        setOpen={setOpen}
        address={address}
        setAddress={setAddress}
      />
    </>
  );
}