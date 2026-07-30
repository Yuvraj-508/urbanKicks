import { useState } from "react";
import { Facebook, Instagram, MessageCircle } from "lucide-react";

import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import ContactDialog from "./ContactDailog";
import PolicyDialog from "./PolicyDialog";
import CompanyDialog from "./CompanyDialog";
import FAQDialog from "./FAQDialog";

export default function Fotter() {
  const [faqOpen, setFaqOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);
  const [policyType, setPolicyType] = useState("shipping");
  const [companyOpen, setCompanyOpen] = useState(false);
  const [companyType, setCompanyType] = useState("about");
  return (
    <footer className="mt-2 border-t bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid grid-cols-2 gap-20 sm:gap-10 lg:grid-cols-5">
          {/* Brand */}

          <div className="lg:col-span-2">
            <h2 className="text-3xl font-black text-white">URBAN</h2>

            <p className="-mt-1 text-sm font-bold tracking-[0.35em] text-emerald-500">
              KICKS
            </p>

            <p className="mt-6 max-w-md leading-7 text-slate-400">
              Premium sneakers crafted for comfort, style, and everyday
              performance.
            </p>

            {/* Social */}

            <div className="mt-8 flex gap-3">
              <a
                href="https://www.instagram.com/urbankicks1122"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-slate-800 p-3 transition hover:bg-pink-600"
              >
                <Instagram className="size-5" />
              </a>

              <a
                href="https://www.instagram.com/urbankicks1122"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-slate-800 p-3 transition hover:bg-blue-600"
              >
                <Facebook className="size-5" />
              </a>

              <a
                href="https://wa.me/916006488288"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-slate-800 p-3 transition hover:bg-green-600"
              >
                <MessageCircle className="size-5" />
              </a>
            </div>
          </div>

          {/* Shop */}

          <div>
            <h3 className="font-bold text-white">Shop</h3>

            <div className="mt-5 space-y-3">
              <Link
                to="/all-products"
                className="block transition hover:text-white"
              >
                All Products
              </Link>

              <button className="block text-left transition hover:text-white">
                <Link to="/all-products">Men</Link>
              </button>

              <button
                disabled
                className="block cursor-not-allowed text-left text-slate-500 opacity-60"
              >
                Women
              </button>

              <button
                disabled
                className="block cursor-not-allowed text-left text-slate-500 opacity-60"
              >
                Sale
              </button>
            </div>
          </div>
          {/* Support */}

          <div>
            <h3 className="font-bold text-white">Support</h3>

            <div className="mt-5 space-y-3">
              <Button
                variant="link"
                className="h-auto justify-start p-0 text-slate-300 hover:text-white"
                onClick={() => setContactOpen(true)}
              >
                Contact Us
              </Button>

              <button
                onClick={() => setFaqOpen(true)}
                className="block text-left transition hover:text-white"
              >
                FAQs
              </button>

              <button
                onClick={() => {
                  setPolicyType("shipping");
                  setPolicyOpen(true);
                }}
                className="block text-left transition hover:text-white"
              >
                Shipping
              </button>

              <button
                onClick={() => {
                  setPolicyType("return");
                  setPolicyOpen(true);
                }}
                className="block text-left transition hover:text-white"
              >
                Returns
              </button>
            </div>
          </div>
          {/* Company */}
          <div>
            <h3 className="font-bold text-white">Company</h3>

            <div className="mt-5 space-y-3">
              <button
                onClick={() => {
                  setCompanyType("about");
                  setCompanyOpen(true);
                }}
                className="block text-left transition hover:text-white"
              >
                About
              </button>

              <button
                onClick={() => {
                  setCompanyType("privacy");
                  setCompanyOpen(true);
                }}
                className="block text-left transition hover:text-white"
              >
                Privacy Policy
              </button>

              <button
                onClick={() => {
                  setCompanyType("terms");
                  setCompanyOpen(true);
                }}
                className="block text-left transition hover:text-white"
              >
                Terms & Conditions
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-sm text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} Urban Kicks. All rights reserved.</p>

          <p className="text-center">Designed with ❤️ for sneaker lovers.</p>
        </div>

        {/* Dialogs will be added here */}
      </div>
      <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />

      <PolicyDialog
        open={policyOpen}
        onOpenChange={setPolicyOpen}
        type={policyType}
      />

      <CompanyDialog
        open={companyOpen}
        onOpenChange={setCompanyOpen}
        type={companyType}
      />

      <FAQDialog open={faqOpen} onOpenChange={setFaqOpen} />
    </footer>
  );
}
