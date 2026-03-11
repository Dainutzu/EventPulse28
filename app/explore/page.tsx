"use client";

import { useState } from "react";
import Image from "next/image";
import { events, faculties, miscCategories } from "@/lib/events";
import { Search, Filter, Calendar, ChevronRight, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null);
  const [selectedMisc, setSelectedMisc] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const router = useRouter();

  const filteredEvents = events.filter((event) => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organiser.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFaculty = !selectedFaculty || event.faculty === selectedFaculty;
    const matchesMisc = !selectedMisc || event.category === selectedMisc;
    
    return matchesSearch && matchesFaculty && matchesMisc;
  });

  const clearFilters = () => {
    setSelectedFaculty(null);
    setSelectedMisc(null);
    setSearchQuery("");
  };

  return (
    <main className="flex flex-col min-h-screen pb-32 bg-white dark:bg-neutral-900">
      {/* Header & Search */}
      <div className="px-6 pt-16 pb-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-neutral-900 dark:text-white tracking-tighter">Explore</h1>
            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mt-1">Discover Pulse Events</p>
          </div>
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="w-12 h-12 rounded-[1.5rem] bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400 active:scale-90 transition-all relative"
          >
            <Filter size={20} />
            {(selectedFaculty || selectedMisc) && (
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-600 border-2 border-white dark:border-neutral-900" />
            )}
          </button>
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <Search size={18} className="text-neutral-400 group-focus-within:text-blue-600 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search events, workshops..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-6 py-5 bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800 rounded-[2rem] text-sm font-bold placeholder:text-neutral-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Featured Pill Section */}
      <div className="px-6 pb-6 flex gap-2 overflow-x-auto no-scrollbar">
        <button
          onClick={clearFilters}
          className={`shrink-0 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${!selectedFaculty && !selectedMisc && searchQuery === "" ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500"}`}
        >
          All Pulse
        </button>
        {faculties?.slice(0, 3)?.map(faculty => (
          <button
            key={faculty}
            onClick={() => setSelectedFaculty(faculty === selectedFaculty ? null : faculty)}
            className={`shrink-0 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedFaculty === faculty ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900" : "bg-neutral-50 dark:bg-neutral-800/50 text-neutral-400"}`}
          >
            {faculty}
          </button>
        ))}
      </div>

      {/* Events Feed */}
      <div className="px-6 space-y-6">
        {filteredEvents.length === 0 ? (
          <div className="py-20 text-center bg-neutral-50 dark:bg-neutral-800/20 rounded-[3rem] border-2 border-dashed border-neutral-100 dark:border-neutral-800">
             <p className="text-neutral-400 text-sm font-bold">No events found.</p>
             <button onClick={clearFilters} className="text-blue-600 text-xs font-black uppercase tracking-widest mt-4">Reset Search</button>
          </div>
        ) : (
          filteredEvents?.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => router.push(`/events/${event.id}`)}
              className="group relative bg-white dark:bg-neutral-800 rounded-[2.5rem] border border-neutral-100 dark:border-neutral-700 overflow-hidden shadow-sm active:scale-[0.98] transition-all cursor-pointer"
            >
              <div className="aspect-[16/9] overflow-hidden relative">
                <Image 
                  src={event.image} 
                  alt={event.title}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  unoptimized
                />
                <div className="absolute top-4 left-4">
                  <span className={`inline-block text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest backdrop-blur-md bg-white/90 text-neutral-900 shadow-sm`}>
                    {event.category}
                  </span>
                </div>
                {i === 0 && (
                   <div className="absolute top-4 right-4 bg-orange-500 text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-1 shadow-lg">
                      <Sparkles size={10} />
                      Trending
                   </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 text-neutral-400 text-[9px] font-black uppercase tracking-widest mb-2">
                  <Calendar size={12} className="text-blue-600" />
                  <span>{event.date} • {event.time}</span>
                </div>
                <h3 className="text-xl font-black text-neutral-900 dark:text-white tracking-tight mb-2 group-hover:text-blue-600 transition-colors uppercase">{event.title}</h3>
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-neutral-50 dark:border-neutral-700/50">
                   <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center text-[10px]">
                         🏢
                      </div>
                      <span className="text-[10px] font-black text-neutral-500 dark:text-neutral-400 uppercase tracking-widest truncate max-w-[150px]">{event.organiser}</span>
                   </div>
                   <div className="w-10 h-10 rounded-2xl bg-neutral-50 dark:bg-neutral-700 flex items-center justify-center text-neutral-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <ChevronRight size={18} />
                   </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Advanced Filter Modal */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-neutral-900/95 backdrop-blur-xl flex flex-col justify-end"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="bg-white dark:bg-neutral-900 rounded-t-[3rem] p-8 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tighter">Filter Events</h2>
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-4">Faculties</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {faculties?.map(faculty => (
                      <button
                        key={faculty}
                        onClick={() => setSelectedFaculty(faculty === selectedFaculty ? null : faculty)}
                        className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${selectedFaculty === faculty ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-transparent" : "bg-white dark:bg-neutral-800 text-neutral-400 border-neutral-100 dark:border-neutral-700"}`}
                      >
                        {faculty}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-4">Categories</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {miscCategories?.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedMisc(cat === selectedMisc ? null : cat)}
                        className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${selectedMisc === cat ? "bg-blue-600 text-white border-transparent" : "bg-white dark:bg-neutral-800 text-neutral-400 border-neutral-100 dark:border-neutral-700"}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full py-5 rounded-[2rem] bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-black text-sm shadow-xl active:scale-95 transition-all mt-4"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
