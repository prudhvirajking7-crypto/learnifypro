"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Users, Clock, BookOpen, ShoppingCart, Heart } from "lucide-react";
import { formatPrice, formatDuration } from "@/lib/utils";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    slug: string;
    shortDescription?: string | null;
    thumbnail?: string | null;
    price: number;
    discountPrice?: number | null;
    currency: string;
    level: string;
    totalDuration: number;
    totalLectures: number;
    instructor: { name?: string | null };
    _count: { enrollments: number; reviews: number };
    averageRating?: number;
  };
  isEnrolled?: boolean;
}

export default function CourseCard({ course, isEnrolled }: CourseCardProps) {
  const [addingToCart, setAddingToCart] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const discountPercent =
    course.discountPrice && course.price > 0
      ? Math.round(((course.price - course.discountPrice) / course.price) * 100)
      : 0;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAddingToCart(true);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: course.id }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Added to cart!");
        window.dispatchEvent(new Event("cart-updated"));
      } else {
        toast.error(data.error || "Failed to add to cart");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setAddingToCart(false);
    }
  };

  const levelColors: Record<string, string> = {
    BEGINNER: "bg-green-100 text-green-700",
    INTERMEDIATE: "bg-yellow-100 text-yellow-700",
    ADVANCED: "bg-red-100 text-red-700",
    ALL_LEVELS: "bg-blue-100 text-blue-700",
  };

  return (
    <Link href={`/courses/${course.slug}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
        {/* Thumbnail */}
        <div className="relative aspect-video bg-gradient-to-br from-amber-100 to-yellow-100 overflow-hidden">
          {course.thumbnail ? (
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-amber-300" />
            </div>
          )}

          {/* Amber gradient hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-amber-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {discountPercent > 0 && (
            <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
              -{discountPercent}%
            </div>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              setWishlisted(!wishlisted);
            }}
            className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Heart
              className={`w-4 h-4 ${wishlisted ? "text-red-500 fill-red-500" : "text-gray-400"}`}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-2">
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full ${levelColors[course.level] || "bg-gray-100 text-gray-600"}`}
            >
              {course.level.replace("_", " ")}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-semibold text-gray-700">
                {(course.averageRating || 0).toFixed(1)}
              </span>
              <span className="text-xs text-gray-400">({course._count.reviews})</span>
            </div>
          </div>

          <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1 line-clamp-2 group-hover:text-amber-600 transition-colors">
            {course.title}
          </h3>

          {course.shortDescription && (
            <p className="text-xs text-gray-500 line-clamp-2 mb-3">
              {course.shortDescription}
            </p>
          )}

          <p className="text-xs text-gray-500 mb-3 mt-auto">
            by{" "}
            <span className="text-amber-600 font-medium">
              {course.instructor.name}
            </span>
          </p>

          <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {course._count.enrollments.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {formatDuration(course.totalDuration)}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              {course.totalLectures} lectures
            </span>
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div>
              {course.discountPrice ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-gray-900">
                    {formatPrice(course.discountPrice, course.currency)}
                  </span>
                  <span className="text-xs text-gray-400 line-through">
                    {formatPrice(course.price, course.currency)}
                  </span>
                </div>
              ) : course.price === 0 ? (
                <span className="text-lg font-bold text-green-600">Free</span>
              ) : (
                <span className="text-lg font-bold text-gray-900">
                  {formatPrice(course.price, course.currency)}
                </span>
              )}
            </div>

            {isEnrolled ? (
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1.5 rounded-lg">
                Enrolled
              </span>
            ) : (
              <button
                onClick={handleAddToCart}
                disabled={addingToCart}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-amber-600 to-yellow-700 rounded-lg hover:from-amber-700 hover:to-yellow-800 transition-all disabled:opacity-50"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                {addingToCart ? "Adding..." : "Add to Cart"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
