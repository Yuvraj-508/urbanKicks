import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import ProductPreview from "@/components/review/ProductPreview";
import RatingSelector from "@/components/review/RatingSelector";
import ExperienceTags from "@/components/review/ExperienceTags";
import ReviewInput from "@/components/review/ReviewInput";
import PhotoUploader from "@/components/review/PhotoUploader";
import CustomerInfo from "@/components/review/CustomerInfo";
import ReviewSuccess from "@/components/review/ReviewSuccess";

import { Button } from "@/components/ui/button";

export default function Review() {
  const [rating, setRating] = useState(0);

  const [review, setReview] = useState("");

  const [photos, setPhotos] = useState([]);

  const [tags, setTags] = useState([]);

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
  });

  const [recommend, setRecommend] = useState("yes");

  const [submitted, setSubmitted] = useState(false);

  const product = {
    id: 1,
    name: "Nike Air Jordan 1 High",
    color: "Black / Green",
    size: "UK 9",
    delivered: "Delivered 2 days ago",
    image: "/images/hero-shoe.webp",
  };

  const handleSubmit = () => {
    console.log({
      rating,
      review,
      photos,
      tags,
      customer,
      recommend,
    });

    setSubmitted(true);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 py-10">
      <div className="mx-auto max-w-3xl px-4">

        <AnimatePresence mode="wait">

          {submitted ? (
            <ReviewSuccess />
          ) : (
            <div className="space-y-8">

              {/* Header */}

              <div className="text-center">

                <p className="text-sm font-bold tracking-[0.3em] text-emerald-600">
                  URBAN KICKS
                </p>

                <h1 className="mt-3 text-4xl font-black text-slate-900">
                  Rate Your Purchase
                </h1>

                <p className="mt-3 text-slate-500">
                  Your review helps thousands of sneaker lovers make
                  better choices.
                </p>

              </div>

              {/* Product */}

              <ProductPreview product={product} />

              {/* Rating */}

              <RatingSelector
                rating={rating}
                setRating={setRating}
              />

              {/* Experience */}

              <ExperienceTags
                tags={tags}
                setTags={setTags}
              />

              {/* Review */}

              <ReviewInput
                review={review}
                setReview={setReview}
              />

              {/* Photos */}

              <PhotoUploader
                photos={photos}
                setPhotos={setPhotos}
              />

              {/* Customer */}

              <CustomerInfo
                customer={customer}
                setCustomer={setCustomer}
                recommend={recommend}
                setRecommend={setRecommend}
              />

              {/* Submit */}

              <Button
                onClick={handleSubmit}
                disabled={
                  rating === 0 ||
                  review.trim() === "" ||
                  customer.name.trim() === ""
                }
                className="h-14 w-full rounded-2xl bg-emerald-600 text-lg font-bold hover:bg-emerald-700"
              >
                Submit Review ⭐
              </Button>

            </div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
}