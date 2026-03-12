"use client";

import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";
import { Mail, Zap, ShieldCheck, ArrowRight } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, signIn } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  const handleDemoSignIn = () => {
    setIsLoading(true);
    // Brief premium animation then instant sign-in with pre-filled demo user
    setTimeout(() => {
      signIn("demo@university.edu");
    }, 800);
  };

  if (user || pathname === "/") return <>{children}</>;

  return (
    <div className="fixed inset-0 z-[2000] bg-white dark:bg-neutral-900 flex flex-col items-center justify-center px-8 overflow-hidden">
      {/* Animated background glow */}
      <motion.div 
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-10 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 blur-[120px] rounded-full" 
      />
      <motion.div 
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 -right-10 w-96 h-96 bg-purple-500/20 dark:bg-purple-500/10 blur-[140px] rounded-full" 
      />

      {/* Main Logo Container */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-28 h-28 bg-neutral-900 dark:bg-white rounded-[2.5rem] flex items-center justify-center shadow-2xl mb-12 relative"
      >
        <Zap size={48} className="text-white dark:text-neutral-900" />
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-[2.5rem] border-2 border-dashed border-neutral-400/20" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 rounded-[2.5rem] bg-blue-500/20 blur-xl"
        />
      </motion.div>

      {/* Branding & Tagline */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-black text-neutral-900 dark:text-white tracking-tighter leading-none mb-4">
          Event <span className="text-blue-600">Pulse</span>
        </h1>
        <p className="text-lg font-bold text-neutral-500 dark:text-neutral-400 tracking-tight uppercase px-4 leading-tight">
          Your Campus. One Pulse.
        </p>
      </motion.div>

      {/* Single Sign-in Button (instant for demo) */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="w-full max-w-[320px] space-y-5"
      >
        <button
          onClick={handleDemoSignIn}
          disabled={isLoading}
          className="group relative flex items-center justify-center gap-3 w-full py-5 rounded-[2rem] bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-black text-base shadow-[0_20px_50px_rgba(0,0,0,0.15)] active:scale-95 transition-all overflow-hidden disabled:opacity-60"
        >
          <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
          <Mail size={20} className="relative z-10" />
          <span className="relative z-10 flex items-center gap-2">
            {isLoading ? (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Launching...
              </motion.span>
            ) : (
              <>
                Sign in with University Email
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </span>
        </button>
        
        <p className="text-[9px] text-center font-black text-neutral-400 uppercase tracking-[0.2em] px-8 leading-relaxed">
          Secure campus network • Student events platform
        </p>
      </motion.div>

      {/* Footer Meta */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1 }}
        className="absolute bottom-12 flex items-center gap-2 text-neutral-400"
      >
        <ShieldCheck size={14} />
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">PulseEngine Verification</span>
      </motion.div>
    </div>
  );
}
