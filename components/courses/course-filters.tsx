"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Filter, X } from "lucide-react";

const LEVELS = [
  { value: "BEGINNER", label: "Beginner" },
  { value: "INTERMEDIATE", label: "Intermediate" },
  { value: "ADVANCED", label: "Advanced" },
  { value: "ALL_LEVELS", label: "All Levels" },
];

const SORT_OPTIONS = [
  { value: "createdAt", label: "Newest" },
  { value: "popular", label: "Most Popular" },
  { value: "rating", label: "Highest Rated" },
  { value: "price", label: "Price: Low to High" },
];

const CATEGORIES = [
  { value: "web-development", label: "Web Development" },
  { value: "data-science", label: "Data Science" },
  { value: "mobile-development", label: "Mobile Dev" },
  { value: "design", label: "Design" },
  { value: "business", label: "Business" },
  { value: "marketing", label: "Marketing" },
  { value: "finance", label: "Finance" },
  { value: "it-software", label: "IT & Software" },
];

export default function CourseFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page");
    router.push(`/courses?${params.toString()}`);
  };

  const clearAll = () => router.push("/courses");
  const hasFilters = searchParams.get("level") || searchParams.get("category") || searchParams.get("sortBy");

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-5">
        <button
          className="flex items-center gap-2 font-semibold text-gray-900 lg:cursor-default w-full"
          onClick={() => setIsOpen((v) => !v)}
        >
          <Filter className="w-4 h-4 text-amber-600" />
          Filters
          <span className="ml-auto lg:hidden text-amber-600 text-xs font-medium">
            {isOpen ? "Hide" : "Show"}
          </span>
        </button>
        {hasFilters && (
          <button onClick={clearAll} className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 shrink-0 ml-2">
            <X className="w-3 h-3" /> Clear all
          </button>
        )}
      </div>

      <div className={`space-y-6 lg:block ${isOpen ? "block" : "hidden"}`}>
        {/* Sort */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Sort By</h4>
          <div className="space-y-2">
            {SORT_OPTIONS.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="sort"
                  value={opt.value}
                  checked={searchParams.get("sortBy") === opt.value}
                  onChange={() => updateFilter("sortBy", opt.value)}
                  className="text-amber-600"
                />
                <span className="text-sm text-gray-600">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Level */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Level</h4>
          <div className="space-y-2">
            {LEVELS.map((level) => (
              <label key={level.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={searchParams.get("level") === level.value}
                  onChange={(e) => updateFilter("level", e.target.checked ? level.value : null)}
                  className="text-amber-600 rounded"
                />
                <span className="text-sm text-gray-600">{level.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Category */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Category</h4>
          <div className="space-y-2">
            {CATEGORIES.map((cat) => (
              <label key={cat.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={searchParams.get("category") === cat.value}
                  onChange={(e) => updateFilter("category", e.target.checked ? cat.value : null)}
                  className="text-amber-600 rounded"
                />
                <span className="text-sm text-gray-600">{cat.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
