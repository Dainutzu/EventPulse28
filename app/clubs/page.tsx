"use client";

import { clubs } from "@/lib/clubs";
import { useApp } from "@/context/AppContext";
import { 
  Users, 
  UserPlus, 
  UserCheck, 
  Sparkles, 
  ChevronRight,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";

export default function ClubsPage() {
  const { toggleFollowClub, isFollowingClub } = useApp();

  return (
    <main className="flex flex-col min-h-screen pb-32 bg-white dark:bg-neutral-900">
      {/* Header */}
      <div className="px-6 pt-16 pb-8">
        <div className="flex items-center justify-between mb-2">
           <h1 className="text-3xl font-black text-neutral-900 dark:text-white tracking-tighter">Communities</h1>
           <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600">
             <Users size={20} />
           </div>
        </div>
        <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest flex items-center gap-2">
          <Sparkles size={12} className="text-blue-500" />
          Join your campus pulse
        </p>
      </div>

      {/* Clubs Grid */}
      <div className="px-6 space-y-6">
        {clubs?.map((club, i) => {
          const following = isFollowingClub(club.id);
          return (
            <motion.div
              key={club.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative group lg:active:scale-[0.98] transition-all"
            >
              <div className="p-6 rounded-[2.5rem] bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                   <Users size={120} />
                </div>

                <div className="flex justify-between items-start mb-6">
                  <div className="w-16 h-16 rounded-[1.8rem] overflow-hidden border border-neutral-100 dark:border-neutral-600 shadow-inner">
                    <img src={club.image} alt={club.name} className="w-full h-full object-cover" />
                  </div>
                  <button
                    onClick={() => toggleFollowClub(club.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${following ? "bg-green-500 text-white shadow-lg shadow-green-500/20" : "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-lg shadow-neutral-900/10"}`}
                  >
                    {following ? <UserCheck size={14} strokeWidth={3} /> : <UserPlus size={14} strokeWidth={3} />}
                    {following ? "Following" : "Join Club"}
                  </button>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 uppercase tracking-widest whitespace-nowrap">
                      {club.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-neutral-400">
                      <Users size={12} />
                      <span className="text-[9px] font-black uppercase tracking-widest">{club.members} Members</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-black text-neutral-900 dark:text-white tracking-tight">{club.name}</h3>
                </div>

                <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6">
                  {club.description}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-neutral-50 dark:border-neutral-700/50">
                   <div className="flex items-center gap-2 text-neutral-400">
                      <Zap size={12} className="text-orange-500" />
                      <span className="text-[9px] font-black uppercase tracking-widest">Active Society</span>
                   </div>
                   <div className="w-8 h-8 rounded-xl bg-neutral-50 dark:bg-neutral-700 flex items-center justify-center text-neutral-400">
                      <ChevronRight size={16} />
                   </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}
