"use client";

import { useApp } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";

export default function NotificationToast() {
  const { notifications } = useApp();

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[1100] w-full max-w-[320px] pointer-events-none">
      <AnimatePresence>
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="mb-3 bg-neutral-900/90 dark:bg-white/90 backdrop-blur-xl p-4 rounded-3xl shadow-2xl flex items-center gap-4 pointer-events-auto border border-white/10 dark:border-black/5"
          >
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
              <Zap size={18} className="text-white fill-current" />
            </div>
            <div className="flex-1 overflow-hidden">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-400 dark:text-blue-600 mb-0.5">Notification</h4>
               <p className="text-xs font-bold text-white dark:text-neutral-900 truncate">{n.message}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
