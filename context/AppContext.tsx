"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Event } from "@/lib/events";

interface RegisteredEvent extends Event {
  ticketId: string;
}

interface User {
  name: string;
  email: string;
}

interface AppContextType {
  user: User | null;
  signIn: () => void;
  registeredEvents: RegisteredEvent[];
  registerEvent: (event: Event) => void;
  isRegistered: (id: string) => boolean;
  attendedEvents: string[];
  checkIn: (id: string) => void;
  isAttended: (id: string) => boolean;
  points: number;
  notifications: any[];
  addNotification: (title: string, message: string) => void;
  followedClubs: string[];
  toggleFollowClub: (id: string) => void;
  isFollowingClub: (id: string) => boolean;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [registeredEvents, setRegisteredEvents] = useState<RegisteredEvent[]>([]);
  const [attendedEvents, setAttendedEvents] = useState<string[]>([]);
  const [points, setPoints] = useState(0);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [followedClubs, setFollowedClubs] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("ep_user");
    const storedEvents = localStorage.getItem("ep_registered_v2");
    const storedAttended = localStorage.getItem("ep_attended");
    const storedPoints = localStorage.getItem("ep_points");
    const storedClubs = localStorage.getItem("ep_clubs");
    const storedDark = localStorage.getItem("ep_dark");

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedEvents) setRegisteredEvents(JSON.parse(storedEvents));
    if (storedAttended) setAttendedEvents(JSON.parse(storedAttended));
    if (storedPoints) setPoints(parseInt(storedPoints));
    if (storedClubs) setFollowedClubs(JSON.parse(storedClubs));
    
    if (storedDark === "true") {
      setDarkMode(true);
      if (typeof document !== "undefined") {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  const signIn = () => {
    const newUser = { name: "Viyath De Silva", email: "viyath.desilva@university.edu" };
    setUser(newUser);
    localStorage.setItem("ep_user", JSON.stringify(newUser));
  };

  const addNotification = (title: string, message: string) => {
    const id = Math.random().toString(36).substring(7);
    setNotifications(prev => [...prev, { id, title, message }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const registerEvent = (event: Event) => {
    setRegisteredEvents((prev) => {
      if (prev.find((e) => e.id === event.id)) return prev;
      const ticketId = `TKT-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
      const updated = [...prev, { ...event, ticketId }];
      localStorage.setItem("ep_registered_v2", JSON.stringify(updated));
      addNotification("Registration Confirmed", `You're all set for ${event.title}!`);
      return updated;
    });
  };

  const checkIn = (eventId: string) => {
    setAttendedEvents((prev) => {
      if (prev.includes(eventId)) return prev;
      const next = [...prev, eventId];
      const newPoints = points + 100;
      setPoints(newPoints);
      localStorage.setItem("ep_attended", JSON.stringify(next));
      localStorage.setItem("ep_points", newPoints.toString());
      addNotification("Checked In!", "You earned 100 Pulse Points! ⚡");
      return next;
    });
  };

  const isAttended = (id: string) => attendedEvents.includes(id);

  const toggleFollowClub = (clubId: string) => {
    setFollowedClubs((prev) => {
      const next = prev.includes(clubId)
        ? prev.filter((id) => id !== clubId)
        : [...prev, clubId];
      localStorage.setItem("ep_clubs", JSON.stringify(next));
      return next;
    });
  };

  const isFollowingClub = (clubId: string) => followedClubs.includes(clubId);

  const isRegistered = (id: string) =>
    registeredEvents.some((e) => e.id === id);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      if (typeof document !== "undefined") {
        if (next) {
          document.documentElement.classList.add("dark");
          localStorage.setItem("ep_dark", "true");
        } else {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("ep_dark", "false");
        }
      }
      return next;
    });
  };

  return (
    <AppContext.Provider
      value={{
        user,
        signIn,
        registeredEvents,
        registerEvent,
        isRegistered,
        attendedEvents,
        checkIn,
        isAttended,
        points,
        notifications,
        addNotification,
        followedClubs,
        toggleFollowClub,
        isFollowingClub,
        darkMode,
        toggleDarkMode,
      }}
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
