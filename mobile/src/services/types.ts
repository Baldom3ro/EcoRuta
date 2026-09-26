// Tipos/interfaces para toda la app EcoRuta
// Estos contratos servirán cuando la API real exista

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'citizen' | 'driver';
  photoUrl?: string;
  zone?: string;
}

export interface TruckLocation {
  id: string;
  driverId: string;
  driverName: string;
  latitude: number;
  longitude: number;
  speed: number;
  heading: number;
  routeId: string;
  lastUpdate: string; // ISO date
  status: 'active' | 'paused' | 'suspended';
}

export interface Route {
  id: string;
  name: string;
  zone: string;
  points: RoutePoint[];
  estimatedDuration: number; // minutos
  status: 'pending' | 'active' | 'completed' | 'suspended';
  assignedTruckId?: string;
  assignedDriverId?: string;
}

export interface RoutePoint {
  latitude: number;
  longitude: number;
  order: number;
  label?: string;
}

export interface Report {
  id: string;
  userId: string;
  userName: string;
  type: 'missed_pickup' | 'overflowing' | 'blocked_access' | 'other';
  description: string;
  photoUrl?: string; // foto opcional
  latitude: number;
  longitude: number;
  address?: string;
  status: 'pending' | 'in_review' | 'resolved';
  createdAt: string; // ISO date
}

export interface Notification {
  id: string;
  type: 'proximity' | 'time_estimate' | 'route_suspended' | 'incident' | 'tip';
  title: string;
  message: string;
  read: boolean;
  createdAt: string; // ISO date
  data?: Record<string, unknown>;
}

export interface Incident {
  id: string;
  driverId: string;
  routeId: string;
  type: 'breakdown' | 'road_block' | 'accident' | 'other';
  description: string;
  latitude: number;
  longitude: number;
  notifiedSupervisor: boolean;
  alertSentToUsers: boolean;
  createdAt: string; // ISO date
}

export interface Tip {
  id: string;
  message: string;
  icon: string;
}
