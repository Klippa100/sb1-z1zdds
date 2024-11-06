export interface TeamMember {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  availability: string[];
  image: string;
}

export interface Event {
  id: string;
  date: Date;
  title: string;
  time: string;
  teamMembers: string[];
  type: 'service' | 'soundcheck' | 'rehearsal';
}

export interface Equipment {
  id: string;
  name: string;
  category: string;
  status: 'available' | 'maintenance' | 'in-use';
  notes: string;
  lastMaintenance?: Date;
}

export interface Alert {
  id: string;
  type: 'maintenance' | 'schedule' | 'general';
  message: string;
  date: Date;
  resolved: boolean;
}