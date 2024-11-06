import React, { createContext, useContext, useState, useEffect } from 'react';
import { TeamMember, Event, Equipment, Alert } from '../types';

interface AppContextType {
  teamMembers: TeamMember[];
  events: Event[];
  equipment: Equipment[];
  alerts: Alert[];
  addTeamMember: (member: Omit<TeamMember, 'id'>) => void;
  updateTeamMember: (id: string, member: Partial<TeamMember>) => void;
  removeTeamMember: (id: string) => void;
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  removeEvent: (id: string) => void;
  updateEquipmentStatus: (id: string, status: Equipment['status'], notes?: string) => void;
  addAlert: (alert: Omit<Alert, 'id' | 'date' | 'resolved'>) => void;
  resolveAlert: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    const saved = localStorage.getItem('teamMembers');
    return saved ? JSON.parse(saved) : [];
  });

  const [events, setEvents] = useState<Event[]>(() => {
    const saved = localStorage.getItem('events');
    return saved ? JSON.parse(saved) : [];
  });

  const [equipment, setEquipment] = useState<Equipment[]>(() => {
    const saved = localStorage.getItem('equipment');
    return saved ? JSON.parse(saved) : [];
  });

  const [alerts, setAlerts] = useState<Alert[]>(() => {
    const saved = localStorage.getItem('alerts');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('teamMembers', JSON.stringify(teamMembers));
  }, [teamMembers]);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('equipment', JSON.stringify(equipment));
  }, [equipment]);

  useEffect(() => {
    localStorage.setItem('alerts', JSON.stringify(alerts));
  }, [alerts]);

  const addTeamMember = (member: Omit<TeamMember, 'id'>) => {
    const newMember = { ...member, id: crypto.randomUUID() };
    setTeamMembers([...teamMembers, newMember]);
  };

  const updateTeamMember = (id: string, member: Partial<TeamMember>) => {
    setTeamMembers(teamMembers.map(m => m.id === id ? { ...m, ...member } : m));
  };

  const removeTeamMember = (id: string) => {
    setTeamMembers(teamMembers.filter(m => m.id !== id));
  };

  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent = { ...event, id: crypto.randomUUID() };
    setEvents([...events, newEvent]);
  };

  const updateEvent = (id: string, event: Partial<Event>) => {
    setEvents(events.map(e => e.id === id ? { ...e, ...event } : e));
  };

  const removeEvent = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const updateEquipmentStatus = (id: string, status: Equipment['status'], notes?: string) => {
    setEquipment(equipment.map(e => {
      if (e.id === id) {
        const updates: Partial<Equipment> = { status };
        if (notes) updates.notes = notes;
        if (status === 'maintenance') {
          updates.lastMaintenance = new Date();
        }
        return { ...e, ...updates };
      }
      return e;
    }));
  };

  const addAlert = (alert: Omit<Alert, 'id' | 'date' | 'resolved'>) => {
    const newAlert = {
      ...alert,
      id: crypto.randomUUID(),
      date: new Date(),
      resolved: false,
    };
    setAlerts([newAlert, ...alerts]);
  };

  const resolveAlert = (id: string) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, resolved: true } : a));
  };

  return (
    <AppContext.Provider value={{
      teamMembers,
      events,
      equipment,
      alerts,
      addTeamMember,
      updateTeamMember,
      removeTeamMember,
      addEvent,
      updateEvent,
      removeEvent,
      updateEquipmentStatus,
      addAlert,
      resolveAlert,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}