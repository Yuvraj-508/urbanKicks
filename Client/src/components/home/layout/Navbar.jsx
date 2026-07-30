import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import {
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  Truck,
  User,
} from "lucide-react";
import useCartStore from "@/store/cartStore";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HashLink } from "react-router-hash-link";
const navItems = [
  {
    name: "Men",
    path: "/all-products",
  },

  {
    name: "Women",
    path: "/women",
    mega: false,
    comingSoon: true,
    columns: [
      {
        title: "Shop",
        links: [
          {
            name: "Sneakers",
            path: "/products?gender=women&category=sneakers",
          },
          { name: "Running", path: "/products?gender=women&category=running" },
          { name: "Casual", path: "/products?gender=women&category=casual" },
          { name: "Sports", path: "/products?gender=women&category=sports" },
          { name: "Heels", path: "/products?gender=women&category=heels" },
          { name: "Sandals", path: "/products?gender=women&category=sandals" },
          {
            name: "Slippers",
            path: "/products?gender=women&category=slippers",
          },
        ],
      },
      {
        title: "Trending",
        links: [
          { name: "New Arrivals", path: "/products?gender=women&sort=new" },
          { name: "Best Sellers", path: "/products?gender=women&sort=popular" },
          { name: "Lifestyle", path: "/products?gender=women&type=lifestyle" },
          { name: "Training", path: "/products?gender=women&type=training" },
        ],
      },
    ],
  },

  {
    name: "Shoes",
    path: "all-products",
  },

  {
    name: "Category",
    path: "/#categories",
  },

  {
    name: "Sale",
    path: "/products?sale=true",
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState(null);

  const cartItems = useCartStore((state) => state.cartItems);

  const totalItems = useCartStore((state) => state.totalItems());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Announcement */}

      <div className="fixed inset-x-0 top-0 z-[60] hidden h-10 items-center justify-center bg-slate-950 text-white lg:flex">
        <div className="flex items-center gap-3 text-sm">
          <Truck className="h-4 w-4 text-emerald-400" />

          <span>Free Shipping on orders above ₹999</span>

          <span className="text-slate-500">|</span>

          <span>7-Day Easy Returns</span>
        </div>
      </div>

      <motion.header
        animate={{
          height: scrolled ? 68 : 82,
        }}
        transition={{
          duration: 0.25,
        }}
        className={`fixed inset-x-0 z-50 ${
          scrolled
            ? "top-0 lg:top-10 border-b bg-white/90 backdrop-blur-xl shadow"
            : "top-0 lg:top-10 bg-transparent"
        }`}
      >
        <div className="mx-auto h-full max-w-7xl px-5">
          <div className="flex h-full items-center justify-between lg:hidden">
            {/* Left - Menu */}
<Sheet open={open} onOpenChange={setOpen}>              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>

              <SheetContent side="left" className="w-80 overflow-y-auto p-0">
                <div className="border-b p-6">
                  <h2 className="text-2xl font-black">URBAN</h2>

                  <p className="text-xs font-bold tracking-[0.35em] text-emerald-600">
                    KICKS
                  </p>
                </div>

                <div className="space-y-6 p-6">
                {navItems.map((item) =>
  item.comingSoon ? (
    <div
      key={item.name}
      className="flex items-center justify-between rounded-lg px-3 py-2 opacity-60"
    >
      <span className="text-lg font-bold text-slate-500">
        {item.name}
      </span>

      <span className="rounded-full bg-amber-100 px-2 py-1 text-[10px] font-semibold text-amber-700">
        Coming Soon
      </span>
    </div>
  ) : (
    <Link
      key={item.name}
      to={item.path}
      onClick={() => setOpen(false)}
      className="block rounded-lg px-3 py-2 text-lg font-bold transition hover:bg-slate-100"
    >
      {item.name}
    </Link>
  )
)}
                </div>
              </SheetContent>
            </Sheet>

            {/* Center - Logo */}
            <Link
              to="/"
              className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center leading-none"
            >
              <h1 className="text-2xl font-black tracking-tight">URBAN</h1>

              <span className="text-[10px] font-bold tracking-[0.35em] text-emerald-600">
                KICKS
              </span>
            </Link>

            {/* Right - Cart & Profile */}
            <div className="flex items-center gap-1">
              <Link to="/cart" className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative rounded-full"
                >
                  <ShoppingBag className="size-5" />

                  {totalItems > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-emerald-600 px-1 text-[10px] font-bold text-white">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>

              <Link to="/profile">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="size-5" />
                </Button>
              </Link>
            </div>
          </div>
          {/* desktop */}
          <div className="hidden h-full items-center justify-between lg:flex">
            <Link to="/" className="flex flex-col leading-none">
              <h1 className="text-2xl font-black tracking-tight">URBAN</h1>

              <span className="text-xs font-bold tracking-[0.4em] text-emerald-600">
                KICKS
              </span>
            </Link>
            <nav className="flex h-full items-center gap-10 ">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative h-full"
                  onMouseEnter={() =>
                    item.mega && !item.comingSoon && setActiveMega(item.name)
                  }
                  onMouseLeave={() =>
                    item.mega && !item.comingSoon && setActiveMega(null)
                  }
                >
                  {item.comingSoon ? (
                    <div className="flex h-full cursor-not-allowed items-center gap-2 text-sm font-semibold text-slate-400">
                      <span>{item.name}</span>

                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-700">
                        Coming Soon
                      </span>
                    </div>
                  ) : item.name === "Category" ? (
                    <HashLink
                      smooth
                      to="/#categories"
                      className="flex h-full items-center gap-1 text-sm font-semibold text-slate-700 transition hover:text-emerald-600"
                    >
                      {item.name}
                    </HashLink>
                  ) : (
                    <NavLink
                      to={item.path}
                      className="flex h-full items-center gap-1 text-sm font-semibold text-slate-700 transition hover:text-emerald-600"
                    >
                      {item.name}

                      {item.mega && <ChevronDown className="h-4 w-4" />}
                    </NavLink>
                  )}

                  <AnimatePresence>
                    {item.mega && activeMega === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 top-full mt-4 w-[760px] -translate-x-1/2 overflow-hidden rounded-3xl border bg-white shadow-2xl"
                      >
                        <div className="grid grid-cols-3 gap-10 p-8">
                          {/* Menu Columns */}

                          <div className="col-span-2 grid grid-cols-2 gap-10">
                            {item.columns.map((column) => (
                              <div key={column.title}>
                                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">
                                  {column.title}
                                </h3>

                                <div className="space-y-3">
                                  {column.links.map((link) => (
                                    <Link
                                      key={link.name}
                                      to={link.path}
                                      className="block text-sm font-medium text-slate-700 transition hover:translate-x-1 hover:text-emerald-600"
                                    >
                                      {link.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Promo Banner */}

                          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-700 p-7 text-white">
                            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                              NEW DROP
                            </span>

                            <h3 className="mt-5 text-3xl font-black leading-tight">
                              Summer
                              <br />
                              Collection
                            </h3>

                            <p className="mt-3 text-sm text-slate-200">
                              Discover premium sneakers built for everyday
                              comfort.
                            </p>

                            <Link
                              to="/products"
                              className="mt-6 inline-flex rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 transition hover:scale-105"
                            >
                              Shop Now
                            </Link>

                            <img
                              src="/images/hero-shoe.png"
                              alt="Sneaker"
                              className="absolute -bottom-8 right-0 w-56 rotate-[-18deg] drop-shadow-2xl"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>
            <div className="flex w-28 items-center justify-end gap-6">
              {" "}
              <Link to="/cart" className="relative">
                <ShoppingBag className="size-5" />

                {totalItems > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-emerald-600 px-1 text-xs font-bold text-white">
                    {totalItems}
                  </span>
                )}
              </Link>
              {/* Profile */}
              <Link to="/profile">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="size-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.header>
      <div className="h-20 lg:h-[120px]" />
    </>
  );
}
