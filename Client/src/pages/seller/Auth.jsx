import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, Smartphone, Footprints } from "lucide-react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { sellerLogin } from "@/services/auth.service";
export default function SellerLogin() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
    remember: false,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleRemember = (checked) => {
    setFormData((prev) => ({
      ...prev,
      remember: checked,
    }));
  };
 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.emailOrPhone.trim()) {
    return toast.error("Email or Phone is required");
  }

  if (!formData.password.trim()) {
    return toast.error("Password is required");
  }

  try {
    setLoading(true);

    const response = await sellerLogin({
      emailOrPhone: formData.emailOrPhone,
      password: formData.password,
    });

    localStorage.setItem("sellerToken", response.token);
  
    if (formData.remember) {
      localStorage.setItem(
        "sellerRemember",
        JSON.stringify({
          emailOrPhone: formData.emailOrPhone,
        })
      );
    } else {
      localStorage.removeItem("sellerRemember");
    }

toast.success(
  `Welcome back, ${response.seller?.name || "Urban Kicks"}! 👟`
);
    navigate("/seller", { replace: true });
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Invalid credentials"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Left Side */}

      <div className="hidden w-1/2 flex-col justify-center bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 p-16 text-white lg:flex">
        <div className="max-w-md">
          <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 backdrop-blur">
            <Footprints className="h-10 w-10" />
          </div>

          <h1 className="text-5xl font-bold">Urban Kicks</h1>

          <p className="mt-3 text-lg text-emerald-100">Seller Dashboard</p>

          <p className="mt-8 text-lg leading-8 text-emerald-50">
            Manage your shoe store with ease. Track products, inventory, orders,
            customers and grow your business from one powerful dashboard.
          </p>

          <div className="mt-12 space-y-4">
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              📦 Manage Products
            </div>

            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              👟 Track Inventory
            </div>

            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              📈 Monitor Store Performance
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="flex flex-1 items-center justify-center p-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl"
        >
          {" "}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 lg:hidden">
              <Footprints className="h-8 w-8 text-white" />
            </div>

            <h2 className="text-3xl font-bold text-slate-900">
              Welcome Back 👋
            </h2>

            <p className="mt-2 text-slate-500">
              Sign in to your seller account
            </p>
          </div>
          {/* Email / Phone */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email or Phone
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />

              <Input
                name="emailOrPhone"
                value={formData.emailOrPhone}
                onChange={handleChange}
                placeholder="Email or Phone Number"
                className="h-12 pl-11"
              />
            </div>
          </div>
          {/* Password */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />

              <Input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="h-12 pl-11 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-500"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          {/* Remember */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={formData.remember}
                onCheckedChange={handleRemember}
              />

              <label htmlFor="remember" className="text-sm text-slate-600">
                Remember Me
              </label>
            </div>

           <button
  disabled
  className="text-sm font-medium text-emerald-600 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
>
  Forgot Password?
</button>
          </div>
          {/* Login */}
          <Button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-xl bg-emerald-600 text-base hover:bg-emerald-700"
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
          <p className="mt-8 text-center text-sm text-slate-500">
            © 2026 Urban Kicks. All rights reserved.
          </p>
        </form>
      </div>
    </div>
  );
}
