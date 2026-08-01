import { useState } from "react";
import { Star, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";

import Re1 from "../../assets/re.jpeg";
import Re2 from "../../assets/re3.jpeg";
import Re3 from "../../assets/re4.jpeg";
import Re4 from "../../assets/re5.jpeg";
import Re5 from "../../assets/re6.jpeg";
import Re6 from "../../assets/re7.jpeg";

  const reviews = [
    {
      id: 1,
      name: "Rahul Sharma",
      city: "Delhi",
      rating: 5,
      image: Re1,
      review:
        "Amazing quality shoes. Looks exactly like premium originals and feels incredibly comfortable.",
    },
    {
      id: 2,
      name: "Priya Verma",
      city: "Mumbai",
      rating: 5,
      image: Re2,
      review:
        "Loved the packaging and comfort. Definitely ordering another pair soon.",
    },
    {
      id: 3,
      name: "Aman Singh",
      city: "Chandigarh",
      rating: 5,
      image: Re3,
      review:
        "Best UA+ sneakers I've purchased. Premium quality with perfect finishing.",
    },
    {
      id: 4,
      name: "Neha Kapoor",
      city: "Bengaluru",
      rating: 5,
      image: Re4,
      review:
        "Stylish, lightweight and extremely comfortable for everyday wear.",
    },
    {
      id: 5,
      name: "Rohit Mehta",
      city: "Jaipur",
      rating: 5,
      image: Re5,
      review:
        "Excellent customer service and the shoes exceeded my expectations.",
    },
    {
      id: 6,
      name: "Anjali Gupta",
      city: "Pune",
      rating: 5,
      image: Re6,
      review:
        "Super comfortable with outstanding support. Highly recommended.",
    },
  ];
const displayReviews=[...reviews,...reviews];
export default function CustomerReviews() {
  const [pause, setPause] = useState(false);


  return (
    <section className="lg:py-20 py-6 bg-white overflow-hidden">

      <div className="max-w-7xl mx-auto px-5">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            CUSTOMER REVIEWS
          </span>

          <h2 className="mt-6 text-4xl font-black text-slate-900 lg:text-5xl">
            Loved By Thousands
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-lg text-slate-500 leading-8">
            Join thousands of happy customers who trust Urban Kicks
            for premium quality, comfort and style.
          </p>
        </motion.div>

        {/* Marquee */}

        <div
          className="relative"
          onMouseEnter={() => setPause(true)}
          onMouseLeave={() => setPause(false)}
        >
          {/* Left Fade */}

          <div className="absolute left-0 top-0 z-20 h-full w-20 bg-gradient-to-r from-white to-transparent pointer-events-none" />

          {/* Right Fade */}

          <div className="absolute right-0 top-0 z-20 h-full w-20 bg-gradient-to-l from-white to-transparent pointer-events-none" />

          {/* Slider */}

          <div
            className="flex gap-6 animate-marquee"
            style={{
              animationPlayState: pause ? "paused" : "running",
            }}
          >
            {[...displayReviews].map((review, index) => (
              <div
className="group relative h-[390px] w-[280px] flex-shrink-0 overflow-hidden rounded-3xl bg-slate-200 shadow-lg transition-transform duration-300 hover:-translate-y-2"
>
                {/* Image */}

                <img
             
src={review.image}
alt={review.name}
loading="lazy"
decoding="async"
fetchPriority="low"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                {/* Gradient */}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Content */}

<div className="absolute bottom-0 w-full bg-black/35 backdrop-blur-md p-6">
                  {/* Rating */}

                  <div className="mb-3 flex">

                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}

                  </div>

                  {/* Review */}

                  <p className="line-clamp-4 text-sm leading-7 text-white">
                    "{review.review}"
                  </p>

                  {/* Divider */}

                  <div className="my-5 h-px bg-white/20" />

                  {/* User */}

                  <div className="flex items-center justify-between">

                    <div>

                      <h3 className="font-bold text-white">
                        {review.name}
                      </h3>

                      <p className="text-sm text-white/70">
                        {review.city}
                      </p>

                    </div>

                    <div className="flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-1 text-[11px] font-semibold text-white shadow-lg">

                      <BadgeCheck className="h-4 w-4" />

                      Verified

                    </div>

                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

    </section>
  );
}