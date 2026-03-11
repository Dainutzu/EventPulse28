"use client";

import { useApp } from "@/context/AppContext";
import { 
  Zap, 
  Mail, 
  Download, 
  Ticket, 
  Sun, 
  Moon, 
  Eye, 
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, registeredEvents, attendedEvents, points, darkMode, toggleDarkMode } = useApp();
  const [selectedTicket, setSelectedTicket] = useState<typeof registeredEvents[0] | null>(null);
  const router = useRouter();

  const handleDownloadPortfolio = () => {
    const headers = ["Title", "Date", "Category", "Status", "Points Earned"];
    const rows = registeredEvents.map(event => {
      const attended = attendedEvents.includes(event.id);
      return [
        event.title,
        event.date,
        event.category,
        attended ? "Attended" : "Registered",
        attended ? "100" : "0"
      ];
    });

    const csvContent = [
      ["STUDENT PARTICIPATION PORTFOLIO"],
      ["Name", user?.name || "Viyath De Silva"],
      ["Email", user?.email || "viyath.desilva@university.edu"],
      [`Total Pulse Points: ${points}`],
      [],
      ["--- ACTIVE REGISTRATIONS ---"],
      headers,
      ...rows,
      [],
      ["--- ORGANIZED EVENTS (SIMULATED) ---"],
      ["Event Name", "Role", "Impact"],
      ["Pulse Hackathon", "Lead Organizer", "400+ participants"],
      ["Tech Talk Series", "Moderator", "150+ attendees"]
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "viyath_participation_portfolio.csv");
    link.click();
  };

  return (
    <main className="flex flex-col min-h-screen pb-32 bg-white dark:bg-neutral-900">
      {/* Header Profile */}
      <div className="px-6 pt-16 pb-8 text-center flex flex-col items-center">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 rounded-[2.5rem] bg-neutral-900 dark:bg-white flex items-center justify-center text-4xl text-white dark:text-neutral-900 shadow-2xl mb-4 relative"
        >
          👤
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-2xl bg-blue-600 border-4 border-white dark:border-neutral-900 flex items-center justify-center">
             <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          </div>
        </motion.div>
        
        <h1 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight text-center">Viyath De Silva</h1>
        <div className="flex items-center gap-1.5 mt-1 text-neutral-500 dark:text-neutral-400">
          <Mail size={12} />
          <span className="text-xs font-bold">viyath.desilva@university.edu</span>
        </div>
      </div>

      {/* Gamification Stats */}
      <div className="px-6 grid grid-cols-2 gap-4 mb-8">
        <div className="flex flex-col items-start justify-between p-6 rounded-[2.5rem] bg-indigo-600 shadow-[0_20px_40px_rgba(79,70,229,0.3)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
             <Zap size={60} className="text-white fill-current" />
          </div>
          <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md mb-4">
            <Zap size={20} className="text-white fill-current" />
          </div>
          <div>
            <p className="text-3xl font-black text-white leading-none">{points}</p>
            <p className="text-[9px] font-black uppercase tracking-widest text-indigo-200 mt-2">Pulse Points</p>
          </div>
        </div>
        
        <button
          onClick={handleDownloadPortfolio}
          className="flex flex-col items-start justify-between p-6 rounded-[2.5rem] bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800 transition-all active:scale-95 text-left"
        >
          <div className="w-10 h-10 rounded-2xl bg-white dark:bg-neutral-700 flex items-center justify-center shadow-sm mb-4">
            <Download size={20} className="text-blue-500" />
          </div>
          <div>
            <p className="text-xl font-black text-neutral-900 dark:text-white leading-none">Portfolio</p>
            <p className="text-[9px] font-black uppercase tracking-widest text-neutral-400 mt-2">Export Data</p>
          </div>
        </button>
      </div>

      {/* Pulse Impact Summary */}
      <div className="px-6 mb-12">
        <div className="p-8 rounded-[3rem] bg-neutral-900 text-white relative overflow-hidden group border border-white/5 shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
             <Zap size={150} />
          </div>
          <div className="relative z-10">
            <h1 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] mb-6">Pulse Impact Dashboard</h1>
            <div className="flex items-end gap-3 mb-8">
               <span className="text-5xl font-black tracking-tighter">98.5</span>
               <span className="text-xs font-black text-blue-400 uppercase tracking-widest mb-2">/ 100 Percentile</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1">Engaged</p>
                  <p className="text-lg font-black uppercase">{attendedEvents.length} Events</p>
               </div>
               <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1">Organized</p>
                  <p className="text-lg font-black uppercase">2 Leads</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="px-6 grid grid-cols-2 gap-4 mb-12">
        <button
          onClick={toggleDarkMode}
          className="flex items-center gap-3 p-4 rounded-3xl bg-neutral-50 dark:bg-neutral-800/30 border border-neutral-100 dark:border-neutral-800/50"
        >
           <div className="w-8 h-8 rounded-xl bg-white dark:bg-neutral-700 flex items-center justify-center shadow-sm">
             {darkMode ? <Sun size={16} className="text-yellow-500" /> : <Moon size={16} className="text-indigo-600" />}
           </div>
           <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">{darkMode ? "Light" : "Dark"}</span>
        </button>
        <div className="flex items-center gap-3 p-4 rounded-3xl bg-neutral-50 dark:bg-neutral-800/30 border border-neutral-100 dark:border-neutral-800/50">
           <div className="w-8 h-8 rounded-xl bg-white dark:bg-neutral-700 flex items-center justify-center shadow-sm">
             <Ticket size={16} className="text-blue-500" />
           </div>
           <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">{registeredEvents.length} Active</span>
        </div>
      </div>

      {/* Registered Events Section */}
      <div className="px-6 pb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-neutral-900 dark:text-white tracking-tight">Registered Events</h2>
          <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em] bg-blue-50 dark:bg-blue-500/10 px-3 py-1 rounded-full">Wallet</span>
        </div>
        
        <div className="space-y-4">
          {registeredEvents.length === 0 ? (
            <div className="py-12 text-center bg-neutral-50 dark:bg-neutral-800/50 rounded-[2.5rem] border-2 border-dashed border-neutral-100 dark:border-neutral-800">
               <p className="text-neutral-400 text-sm font-bold">No active registrations.</p>
            </div>
          ) : (
            registeredEvents?.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setSelectedTicket(event)}
                className="group relative bg-white dark:bg-neutral-800 p-5 rounded-[2.5rem] border border-neutral-100 dark:border-neutral-700 shadow-sm active:scale-[0.98] transition-all cursor-pointer overflow-hidden"
              >
                <div className="absolute right-0 top-0 h-full w-1.5 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">{event.date}</span>
                  <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <QRCodeSVG value={event.ticketId} size={16} />
                  </div>
                </div>
                <h3 className="text-lg font-black text-neutral-900 dark:text-white tracking-tight mb-4">{event.title}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-neutral-500">
                    <Eye size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Digital Ticket</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/events/${event.id}`);
                      }}
                      className="px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-700 text-[9px] font-black uppercase tracking-widest text-neutral-500 hover:bg-blue-600 hover:text-white transition-all"
                    >
                      View Event
                    </button>
                    <ChevronRight size={16} className="text-neutral-300 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Ticket Modal */}
      <AnimatePresence>
        {selectedTicket && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-neutral-900/90 backdrop-blur-xl"
            onClick={() => setSelectedTicket(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              className="w-full max-w-sm bg-white dark:bg-neutral-900 rounded-[3rem] overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-6 right-6">
                <button 
                  onClick={() => setSelectedTicket(null)}
                  className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <div className="p-8 pb-4 text-center">
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Ticket size={32} className="text-blue-600" />
                </div>
                <h2 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight mb-2">{selectedTicket.title}</h2>
                <div className="flex items-center justify-center gap-2 text-neutral-400 font-bold text-xs uppercase tracking-widest mb-8">
                  <span>{selectedTicket.date}</span>
                  <span>•</span>
                  <span>{selectedTicket.time}</span>
                </div>
              </div>

              <div className="px-8 pb-10 flex flex-col items-center">
                <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-neutral-100 mb-8">
                  <QRCodeSVG value={selectedTicket.ticketId} size={180} />
                </div>
                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] mb-2">Verification ID</p>
                <p className="text-lg font-mono font-black text-neutral-900 dark:text-neutral-100">{selectedTicket.ticketId}</p>
              </div>

              <div className="bg-neutral-50 dark:bg-neutral-800/50 p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white dark:bg-neutral-700 flex items-center justify-center shadow-sm">
                    <Zap size={20} className="text-yellow-500 fill-current" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Entry Status</p>
                    <p className="text-xs font-black text-neutral-900 dark:text-white">Valid Ticket</p>
                  </div>
                </div>
                <button 
                  onClick={() => window.location.href = `/events/${selectedTicket.id}`}
                  className="w-12 h-12 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center shadow-lg active:scale-90 transition-all"
                >
                  <ExternalLink size={20} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
