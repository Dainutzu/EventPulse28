"use client";

import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { categoryColors } from "@/lib/events";
import { Moon, Sun, Calendar, ChevronRight, UserCircle2 } from "lucide-react";

export default function ProfilePage() {
  const { registeredEvents, darkMode, toggleDarkMode } = useApp();
  const router = useRouter();

  return (
    <main className="flex flex-col min-h-screen pb-28 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-14 pb-6">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
          Profile
        </h1>
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-200 active:scale-95"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      {/* Avatar & Name */}
      <div className="flex flex-col items-center px-5 pb-8">
        <div className="w-20 h-20 rounded-3xl bg-neutral-900 dark:bg-white flex items-center justify-center mb-4 shadow-md">
          <UserCircle2
            size={44}
            className="text-white dark:text-neutral-900"
          />
        </div>
        <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
          Campus Student
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
          University Member
        </p>
      </div>

      {/* Divider */}
      <div className="px-5 mb-5">
        <div className="h-px bg-neutral-100 dark:bg-neutral-800" />
      </div>

      {/* Registered Events */}
      <div className="px-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
            Registered Events
          </h3>
          <span className="text-xs font-semibold text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-full">
            {registeredEvents.length}
          </span>
        </div>

        {registeredEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-3xl mb-3">🎟️</p>
            <p className="text-neutral-900 dark:text-white font-semibold text-sm">
              No registered events yet
            </p>
            <p className="text-neutral-500 dark:text-neutral-400 text-xs mt-1 mb-4">
              Browse events and sign up for something exciting
            </p>
            <button
              onClick={() => router.push("/explore")}
              className="px-5 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl text-sm font-semibold transition-all active:scale-95"
            >
              Explore Events
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {registeredEvents.map((event, i) => (
              <button
                key={event.id}
                onClick={() => router.push(`/events/${event.id}`)}
                className="w-full flex items-center justify-between bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 active:scale-[0.99] transition-all duration-200 animate-slide-up text-left"
                style={{ animationDelay: `${i * 40}ms`, animationFillMode: "both" }}
              >
                <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                  <span
                    className={`self-start inline-block text-xs font-semibold px-2 py-0.5 rounded-lg ${
                      categoryColors[event.category] ?? "bg-neutral-100 text-neutral-600"
                    }`}
                  >
                    {event.category}
                  </span>
                  <p className="text-sm font-semibold text-neutral-900 dark:text-white truncate">
                    {event.title}
                  </p>
                  <div className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400">
                    <Calendar size={12} />
                    <span className="text-xs">{event.date}</span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-neutral-300 dark:text-neutral-600 shrink-0 ml-2" />
              </button>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
