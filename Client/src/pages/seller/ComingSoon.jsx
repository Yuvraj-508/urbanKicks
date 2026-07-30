import { Sparkles, Rocket, ArrowLeft } from "lucide-react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation, useNavigate } from "react-router";
export default function ComingSoon({
  title,
  description,
  icon: Icon,
}) {

const navigate = useNavigate();
const location = useLocation();

const handleBack = () => {
  if (location.pathname.startsWith("/seller")) {
    navigate("/seller");
  } else if (window.history.length > 1) {
    navigate(-1);
  } else {
    navigate("/");
  }
};

  return (
    <div className="flex min-h-[calc(100vh-120px)] items-center justify-center px-6">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg">
          <Icon className="h-12 w-12 text-white" />
        </div>

        <Badge className="mt-8 rounded-full bg-emerald-100 px-4 py-1 text-emerald-700 hover:bg-emerald-100">
          <Sparkles className="mr-2 h-4 w-4" />
          Coming Soon
        </Badge>

        <h1 className="mt-6 text-4xl font-bold text-slate-900">
          {title}
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-slate-500">
          {description}
        </p>

        <div className="mt-10 rounded-2xl border border-dashed border-emerald-200 bg-emerald-50 p-6">
          <Rocket className="mx-auto mb-4 h-10 w-10 text-emerald-600" />

          <h3 className="text-lg font-semibold text-slate-900">
            Currently Under Development
          </h3>

          <p className="mt-2 text-slate-600">
            This module is actively being built. A future update will
            include a modern UI, advanced features, analytics and a
            seamless user experience.
          </p>
        </div>

      <Button
  onClick={handleBack}
  className="mt-10 rounded-xl bg-emerald-600 px-8 hover:bg-emerald-700"
>
  <ArrowLeft className="mr-2 size-4" />
  Back
</Button>
      </div>
    </div>
  );
}