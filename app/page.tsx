import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 pb-24">
      {/* Logo */}
      <div className="flex flex-col items-center animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-neutral-900 dark:bg-white flex items-center justify-center mb-6 shadow-lg">
          <Zap size={28} className="text-white dark:text-neutral-900" fill="currentColor" />
        </div>

        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2">
          Event Pulse
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-center text-base leading-relaxed max-w-xs">
          Discover what's happening on campus.
        </p>
      </div>

      {/* CTA Button */}
      <div className="mt-12 w-full max-w-xs animate-slide-up">
        <Link
          href="/explore"
          className="flex items-center justify-center gap-2 w-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 py-4 rounded-2xl font-semibold text-base shadow-lg active:scale-95 transition-all duration-200 hover:bg-neutral-700 dark:hover:bg-neutral-100"
        >
          Explore Events
          <ArrowRight size={18} />
        </Link>
      </div>

      {/* Subtle footer note */}
      <p className="mt-8 text-xs text-neutral-400 dark:text-neutral-600">
        8 events happening now
      </p>
    </main>
  );
}
