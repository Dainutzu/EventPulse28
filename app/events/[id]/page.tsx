"use client";

import { useRouter } from "next/navigation";
import { events, categoryColors } from "@/lib/events";
import { useApp } from "@/context/AppContext";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  Building2,
  CheckCircle2,
} from "lucide-react";

export default function EventDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const router = useRouter();
  const { registerEvent, isRegistered } = useApp();

  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen px-6">
        <p className="text-neutral-500 dark:text-neutral-400">Event not found.</p>
        <button
          onClick={() => router.back()}
          className="mt-4 text-sm font-medium text-neutral-900 dark:text-white underline"
        >
          Go back
        </button>
      </main>
    );
  }

  const registered = isRegistered(event.id);

  const handleRegister = () => {
    registerEvent(event);
  };

  return (
    <main className="flex flex-col min-h-screen pb-32 animate-fade-in">
      {/* Top bar */}
      <div className="flex items-center px-4 pt-14 pb-4">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors active:scale-95"
        >
          <ArrowLeft size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="px-5 flex flex-col gap-5 animate-slide-up">
        {/* Category */}
        <span
          className={`self-start inline-block text-xs font-semibold px-3 py-1.5 rounded-xl ${
            categoryColors[event.category] ?? "bg-neutral-100 text-neutral-600"
          }`}
        >
          {event.category}
        </span>

        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white leading-tight">
            {event.title}
          </h1>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-4 flex flex-col gap-2">
            <Calendar size={16} className="text-neutral-400 dark:text-neutral-500" />
            <div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Date</p>
              <p className="text-sm font-semibold text-neutral-900 dark:text-white leading-snug">
                {event.date}
              </p>
            </div>
          </div>
          <div className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-4 flex flex-col gap-2">
            <Clock size={16} className="text-neutral-400 dark:text-neutral-500" />
            <div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Time</p>
              <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                {event.time}
              </p>
            </div>
          </div>
          <div className="col-span-2 bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-4 flex items-center gap-3">
            <MapPin size={16} className="text-neutral-400 dark:text-neutral-500 shrink-0" />
            <div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Location</p>
              <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                {event.location}
              </p>
            </div>
          </div>
          <div className="col-span-2 bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-4 flex items-center gap-3">
            <Building2 size={16} className="text-neutral-400 dark:text-neutral-500 shrink-0" />
            <div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Organiser</p>
              <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                {event.organizer}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">
            About
          </h2>
          <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
            {event.description}
          </p>
        </div>
      </div>

      {/* Register Button — Fixed at bottom within container */}
      <div className="fixed bottom-16 left-0 right-0 flex justify-center px-5 pb-2 z-40">
        <div className="w-full max-w-md">
          <button
            onClick={handleRegister}
            disabled={registered}
            className={`w-full py-4 rounded-2xl font-semibold text-base flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 ${
              registered
                ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 cursor-default"
                : "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-lg hover:bg-neutral-700 dark:hover:bg-neutral-100"
            }`}
          >
            {registered ? (
              <>
                <CheckCircle2 size={18} />
                Registered
              </>
            ) : (
              "Register for Event"
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
