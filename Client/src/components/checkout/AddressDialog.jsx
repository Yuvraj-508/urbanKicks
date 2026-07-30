import { useEffect, useMemo, useState } from "react";
import {
  Home,
  Building2,
  MapPin,
  Plus,
  Search,
  Check,
  Pencil,
  Trash2,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import AddressForm from "./AddressForm";
import DeleteAddressDialog from "./DeleteAddressDialog";

const initialForm = {
  type: "Home",
  name: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
};

export default function AddressDialog({
  open,
  setOpen,
  address,
  setAddress,
}) {

  const [addresses, setAddresses] = useState([]);

const [search, setSearch] = useState("");

const [showForm, setShowForm] = useState(false);

const [editingAddress, setEditingAddress] = useState(null);

const [deleteAddress, setDeleteAddress] = useState(null);

const [form, setForm] = useState(initialForm);

useEffect(() => {
  const saved = JSON.parse(
    localStorage.getItem("uk-addresses") || "[]"
  );

  setAddresses(saved);
}, []);

const filteredAddresses = useMemo(() => {
  return addresses.filter((item) => {
    const keyword = search.toLowerCase();

    return (
      item.name.toLowerCase().includes(keyword) ||
      item.phone.includes(keyword) ||
      item.city.toLowerCase().includes(keyword) ||
      item.state.toLowerCase().includes(keyword) ||
      item.address.toLowerCase().includes(keyword)
    );
  });
}, [addresses, search]);

const saveAddress = () => {
  if (
    !form.name ||
    !form.phone ||
    !form.address ||
    !form.city ||
    !form.state ||
    !form.pincode
  ) {
    return;
  }

  let updated = [];

  if (editingAddress) {
    updated = addresses.map((item) =>
      item.id === editingAddress.id
        ? {
            ...editingAddress,
            ...form,
          }
        : item
    );
  } else {
    const newAddress = {
      id: crypto.randomUUID(),
      ...form,
    };

    updated = [...addresses, newAddress];

    setAddress(newAddress);
  }

  setAddresses(updated);

  localStorage.setItem(
    "uk-addresses",
    JSON.stringify(updated)
  );

  setShowForm(false);

  setEditingAddress(null);

  setForm(initialForm);
};

const editAddress = (item) => {
  setEditingAddress(item);

  setForm(item);

  setShowForm(true);
};

const selectAddress = (item) => {
  setAddress(item);

  setOpen(false);
};

const confirmDelete = () => {
  const updated = addresses.filter(
    (item) => item.id !== deleteAddress.id
  );

  setAddresses(updated);

  localStorage.setItem(
    "uk-addresses",
    JSON.stringify(updated)
  );

  if (address?.id === deleteAddress.id) {
    setAddress(updated.length ? updated[0] : null);
  }

  setDeleteAddress(null);
}

return (
  <>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl overflow-hidden rounded-3xl p-0 space-x-1">

        <DialogHeader className="border-b bg-gradient-to-r from-emerald-50 via-white to-white px-6 py-6">
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold">
            <MapPin className="h-6 w-6 text-emerald-600" />
            Delivery Address
          </DialogTitle>

          <DialogDescription>
            Select, edit or add your delivery address.
          </DialogDescription>
        </DialogHeader>

        {!showForm ? (
          <div className="max-h-[65vh] space-y-4 overflow-y-auto p-6">

            <Button
              onClick={() => {
                setEditingAddress(null);
                setForm(initialForm);
                setShowForm(true);
              }}
              className="h-14 w-full rounded-2xl"
            >
              <Plus className="mr-2 h-5 w-5" />
              Add New Address
            </Button>

            {filteredAddresses.length === 0 ? (
              <div className="rounded-3xl border border-dashed py-16 text-center">
                <MapPin className="mx-auto h-12 w-12 text-slate-300" />

                <h3 className="mt-4 text-lg font-semibold">
                  No Address Found
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Add your first delivery address.
                </p>
              </div>
            ) : (
              filteredAddresses.map((item) => (
                <div
                  key={item.id}
                  className={`rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    address?.id === item.id
                      ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-200"
                      : "border-slate-200"
                  }`}
                >
                  <div className="flex items-start justify-between">

                    <div className="flex gap-4">

                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                        {item.type === "Home" ? (
                          <Home className="h-6 w-6 text-emerald-600" />
                        ) : (
                          <Building2 className="h-6 w-6 text-emerald-600" />
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">

                          <h3 className="text-lg font-semibold">
                            {item.type}
                          </h3>

                          {address?.id === item.id && (
                            <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs text-white">
                              Selected
                            </span>
                          )}

                        </div>

                        <p className="mt-3 font-semibold">
                          {item.name}
                        </p>

                        <p className="text-sm text-slate-500">
                          {item.phone}
                        </p>

                        <p className="mt-3 text-sm leading-6 text-slate-600">
                          {item.address}
                          <br />
                          {item.city}, {item.state}
                          <br />
                          {item.pincode}
                        </p>
                      </div>

                    </div>
                      <div className="flex flex-col gap-3 items-center">

                      <Button
                        className="rounded-xl"
                        onClick={() => selectAddress(item)}
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Deliver Here
                      </Button>

                      <Button
                        variant="outline"
                        className="rounded-xl w-fit "
                        onClick={() => editAddress(item)}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
               
                      </Button>

                      <Button
                        variant="outline"
                        className="rounded-xl w-fit border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={() => setDeleteAddress(item)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                       
                      </Button>

                    </div>

                  </div>
                </div>
              ))
            )}

          </div>
        ) : (

          <AddressForm
            form={form}
            setForm={setForm}
            saveAddress={saveAddress}
            setShowForm={setShowForm}
            editingAddress={editingAddress}
          />

        )}

      </DialogContent>
    </Dialog>
          <DeleteAddressDialog
        open={!!deleteAddress}
        onOpenChange={(value) => {
          if (!value) {
            setDeleteAddress(null);
          }
        }}
        address={deleteAddress}
        onDelete={confirmDelete}
      />
    </>
  );
}