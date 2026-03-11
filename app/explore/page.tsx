"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X, MapPin, Calendar } from "lucide-react";
import { events, categoryColors } from "@/lib/events";

const categories = [
  "All",
  "Computing",
  "Business",
  "Architecture",
  "Law",
  "Hospitality",
  "Humanities",
  "Sports",
  "Music",
];

export default function ExplorePage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const router = useRouter();

  const filtered = events.filter((event) => {
    const matchesQuery =
      event.title.toLowerCase().includes(query.toLowerCase()) ||
      event.category.toLowerCase().includes(query.toLowerCase()) ||
      event.organizer.toLowerCase().includes(query.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || event.category === activeCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <main className="flex flex-col min-h-screen pb-24">
      {/* Header */}
      <div className="px-5 pt-14 pb-4">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
          Explore
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
          {events.length} events on campus
        </p>
      </div>

      {/* Search Bar */}
      <div className="px-5 mb-4">
        <div className="flex items-center gap-3 bg-neutral-100 dark:bg-neutral-800 rounded-2xl px-4 py-3">
          <Search size={18} className="text-neutral-400 dark:text-neutral-500 shrink-0" />
          <input
            type="text"
            placeholder="Search events…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 text-sm outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 px-5 overflow-x-auto pb-1 scrollbar-hide mb-4" style={{ scrollbarWidth: "none" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === cat
                ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Event Cards */}
      <div className="px-5 flex flex-col gap-3 animate-fade-in">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-neutral-900 dark:text-white font-semibold">No events found</p>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">
              Try a different search or category
            </p>
          </div>
        ) : (
          filtered.map((event, i) => (
            <button
              key={event.id}
              onClick={() => router.push(`/events/${event.id}`)}
              className="w-full text-left bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 rounded-2xl p-4 space-y-3 hover:border-neutral-300 dark:hover:border-neutral-600 hover:shadow-md active:scale-[0.98] transition-all duration-200 animate-slide-up"
              style={{ animationDelay: `${i * 50}ms`, animationFillMode: "both" }}
            >
              {/* Category badge */}
              <span
                className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-lg ${
                  categoryColors[event.category] ?? "bg-neutral-100 text-neutral-600"
                }`}
              >
                {event.category}
              </span>

              {/* Title */}
              <h2 className="text-base font-semibold text-neutral-900 dark:text-white leading-snug">
                {event.title}
              </h2>

              {/* Meta */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
                  <Calendar size={13} />
                  <span className="text-xs">{event.date} · {event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
                  <MapPin size={13} />
                  <span className="text-xs truncate">{event.location}</span>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </main>
  );
}
