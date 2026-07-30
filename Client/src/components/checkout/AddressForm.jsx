import {
  Home,
  Building2,
  MapPin,
  User,
  Phone,
  Landmark,
  MapPinned,
  Save,
  ArrowLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddressForm({
  form,
  setForm,
  saveAddress,
  setShowForm,
  editingAddress,
}) {
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const addressTypes = [
    {
      label: "Home",
      icon: Home,
    },
    {
      label: "Work",
      icon: Building2,
    },
    {
      label: "Other",
      icon: MapPin,
    },
  ];

  return (
    <div className="max-h-[70vh] overflow-y-auto p-3">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {editingAddress ? "Edit Address" : "Add New Address"}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Enter your delivery details below.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => setShowForm(false)}
          className="rounded-xl"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      {/* Address Type */}

      <div className="mb-8">
        <Label className="mb-3 block">Address Type</Label>

        <div className="grid grid-cols-3 gap-3">
          {addressTypes.map((item) => {
            const Icon = item.icon;

            return (
              <Button
                key={item.label}
                type="button"
                variant={
                  form.type === item.label ? "default" : "outline"
                }
                className="h-14 rounded-2xl"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    type: item.label,
                  }))
                }
              >
                <Icon className="mr-2 h-5 w-5" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Form */}

      <div className="grid gap-5 md:grid-cols-2">

        <div>
          <Label>Full Name</Label>

          <div className="relative mt-2">
            <User className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />

            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter full name"
              className="h-12 rounded-xl pl-11"
            />
          </div>
        </div>

        <div>
          <Label>Phone Number</Label>

          <div className="relative mt-2">
            <Phone className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />

            <Input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="h-12 rounded-xl pl-11"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <Label>Street Address</Label>

          <div className="relative mt-2">
            <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />

            <Input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="House No, Street, Area..."
              className="h-12 rounded-xl pl-11"
            />
          </div>
        </div>

        <div>
          <Label>City</Label>

          <div className="relative mt-2">
            <Landmark className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />

            <Input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              className="h-12 rounded-xl pl-11"
            />
          </div>
        </div>

        <div>
          <Label>State</Label>

          <div className="relative mt-2">
            <Building2 className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />

            <Input
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="State"
              className="h-12 rounded-xl pl-11"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <Label>Pincode</Label>

          <div className="relative mt-2">
            <MapPinned className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />

            <Input
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              placeholder="Pincode"
              className="h-12 rounded-xl pl-11"
            />
          </div>
        </div>

      </div>

      {/* Footer */}

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          variant="outline"
          className="h-12 rounded-xl"
          onClick={() => setShowForm(false)}
        >
          Cancel
        </Button>

        <Button
          className="h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700"
          onClick={saveAddress}
        >
          <Save className="mr-2 h-5 w-5" />
          {editingAddress ? "Update Address" : "Save Address"}
        </Button>
      </div>
    </div>
  );
}