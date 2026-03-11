"use client";

import Link from "next/link";
import { Compass, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-white dark:bg-neutral-900">
      <div className="flex-1 flex flex-col items-center justify-center px-8 relative">
        {/* Background glow effects */}
        <div className="absolute top-1/4 -left-10 w-64 h-64 bg-blue-500/10 dark:bg-blue-500/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-1/4 -right-10 w-64 h-64 bg-purple-500/10 dark:bg-purple-500/5 blur-[100px] rounded-full" />

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-24 h-24 bg-neutral-900 dark:bg-white rounded-[2.5rem] flex items-center justify-center shadow-2xl mb-12 relative"
        >
          <Zap size={40} className="text-white dark:text-neutral-900 animate-pulse" />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-[2.5rem] border-2 border-dashed border-neutral-400/20" 
          />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-6 border border-neutral-200/50 dark:border-neutral-700/50">
            <Sparkles size={12} className="text-yellow-500" />
            Investor Ready 2026
          </div>
          
          <h1 className="text-5xl font-black text-neutral-900 dark:text-white tracking-tighter leading-none mb-4">
            Event <span className="text-blue-600 dark:text-blue-400">Pulse</span>
          </h1>
          <p className="text-base font-medium text-neutral-500 dark:text-neutral-400 max-w-xs mx-auto leading-relaxed mb-12 text-center">
            The next generation of campus event discovery and ticketing. Built for you.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="w-full max-w-[280px]"
        >
          <Link
            href="/explore"
            className="group relative flex items-center justify-center gap-3 w-full py-5 rounded-[2rem] bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-black text-base shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(255,255,255,0.05)] transition-all active:scale-95 overflow-hidden"
          >
            <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
            <span className="relative z-10">Launch Experience</span>
            <Compass size={20} className="relative z-10 group-hover:rotate-45 transition-transform duration-500" />
          </Link>

          <div className="flex items-center justify-center gap-2 mt-8 text-neutral-400">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-neutral-900 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-[10px] font-bold">
                  {i === 3 ? "10+" : "👤"}
                </div>
              ))}
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest">Joining today</span>
          </div>
        </motion.div>
      </div>

      {/* Footer Branding */}
      <div className="pb-12 text-center opacity-30">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400">Powered by PulseEngine</p>
      </div>
    </main>
  );
}
