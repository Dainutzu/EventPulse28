"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";
import { Zap, ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
  const { user, signIn } = useApp();
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    if (user && !isNavigating) {
      router.push("/explore");
    }
  }, [user, router, isNavigating]);

  const handleSignIn = () => {
    setIsNavigating(true);
    // Initialize demo user
    signIn("demo.user@university.edu");
    router.push("/explore");
  };

  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-b from-white to-blue-50 dark:from-neutral-900 dark:to-neutral-950 p-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-400/20 dark:bg-indigo-600/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-24 h-24 bg-neutral-900 dark:bg-white rounded-[2rem] flex items-center justify-center shadow-2xl mb-8 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-[2rem] pointer-events-none" />
          <Zap className="text-white dark:text-neutral-900" size={40} />
          
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-neutral-900"
          >
             <Sparkles size={10} className="text-white" />
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-black text-neutral-900 dark:text-white tracking-tighter mb-4">
            Event Pulse
          </h1>
          <p className="text-sm font-bold text-neutral-500 dark:text-neutral-400 tracking-widest uppercase">
            Your Campus. One Pulse.
          </p>
        </motion.div>

        {/* Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full"
        >
          <button
            onClick={handleSignIn}
            disabled={isNavigating}
            className="w-full py-5 px-6 rounded-[2rem] bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-black text-sm shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 transition-colors group-hover:text-white">Sign in with University Email</span>
            <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform group-hover:text-white" />
          </button>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 text-[10px] font-bold text-neutral-400 uppercase tracking-widest text-center"
        >
          Demo Mode • Instant Access
        </motion.p>
      </div>
    </main>
  );
}
