"use client";

import { clubs } from "@/lib/clubs";
import { useApp } from "@/context/AppContext";
import { 
  Users, 
  UserPlus, 
  UserCheck, 
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

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
      <div className="px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs?.map((club, i) => {
          const following = isFollowingClub(club.id);
          return (
            <motion.div
              key={club.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative group lg:active:scale-[0.98] transition-all h-full"
            >
              <div className="h-full p-8 rounded-[2.5rem] bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 shadow-sm hover:shadow-xl transition-all relative overflow-hidden flex flex-col">
                <div className="absolute top-0 right-0 p-6 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                   <Users size={100} />
                </div>

                <div className="flex flex-col items-center text-center flex-1">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-neutral-700 shadow-lg relative mb-6">
                    <Image 
                      src={club.image || "/clubs/default-club.jpg"} 
                      alt={club.name} 
                      className="w-full h-full object-cover"
                      fill
                      unoptimized
                    />
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <span className="text-[9px] font-black px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                        {club.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-neutral-400">
                        <Users size={12} />
                        <span className="text-[9px] font-black uppercase tracking-widest">{club.members}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tighter uppercase">{club.name}</h3>
                  </div>

                  <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 leading-relaxed mb-8 px-2 line-clamp-2">
                    {club.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-neutral-50 dark:border-neutral-700/50 mt-auto">
                  <button
                    onClick={() => toggleFollowClub(club.id)}
                    className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-lg ${following ? "bg-green-500 text-white shadow-green-500/20" : "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-neutral-900/10 active:scale-95"}`}
                  >
                    {following ? <UserCheck size={18} strokeWidth={3} /> : <UserPlus size={18} strokeWidth={3} />}
                    {following ? "Following" : "Join Club"}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}
