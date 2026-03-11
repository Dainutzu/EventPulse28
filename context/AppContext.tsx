"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Event } from "@/lib/events";

interface AppContextType {
  registeredEvents: Event[];
  registerEvent: (event: Event) => void;
  isRegistered: (id: string) => boolean;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const storedEvents = localStorage.getItem("ep_registered");
    const storedDark = localStorage.getItem("ep_dark");
    if (storedEvents) setRegisteredEvents(JSON.parse(storedEvents));
    if (storedDark === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const registerEvent = (event: Event) => {
    setRegisteredEvents((prev) => {
      if (prev.find((e) => e.id === event.id)) return prev;
      const updated = [...prev, event];
      localStorage.setItem("ep_registered", JSON.stringify(updated));
      return updated;
    });
  };

  const isRegistered = (id: string) =>
    registeredEvents.some((e) => e.id === id);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("ep_dark", "true");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("ep_dark", "false");
      }
      return next;
    });
  };

  return (
    <AppContext.Provider
      value={{ registeredEvents, registerEvent, isRegistered, darkMode, toggleDarkMode }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
