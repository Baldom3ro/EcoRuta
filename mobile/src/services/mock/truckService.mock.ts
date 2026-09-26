// Mock de ubicación de camiones
import {TruckLocation, Route, RoutePoint, Tip, Incident} from '../types';

// Ruta simulada (ajustar coordenadas a tu ciudad)
const mockRoutePoints: RoutePoint[] = [
  {latitude: 20.6600, longitude: -103.3500, order: 1, label: 'Inicio'},
  {latitude: 20.6610, longitude: -103.3490, order: 2, label: 'Calle Morelos'},
  {latitude: 20.6625, longitude: -103.3475, order: 3, label: 'Av. Juárez'},
  {latitude: 20.6640, longitude: -103.3460, order: 4, label: 'Plaza Central'},
  {latitude: 20.6655, longitude: -103.3445, order: 5, label: 'Col. San Marcos'},
  {latitude: 20.6670, longitude: -103.3430, order: 6, label: 'Final'},
];

let currentPointIndex = 0;

export const getTruckLocation = async (): Promise<TruckLocation> => {
  await new Promise<void>(resolve => setTimeout(resolve, 200));

  // Simula movimiento del camión por la ruta
  const point = mockRoutePoints[currentPointIndex % mockRoutePoints.length];
  currentPointIndex++;

  return {
    id: 'truck-001',
    driverId: 'driver-001',
    driverName: 'Carlos Rodríguez',
    latitude: point.latitude + (Math.random() - 0.5) * 0.001,
    longitude: point.longitude + (Math.random() - 0.5) * 0.001,
    speed: 15 + Math.random() * 10,
    heading: 45,
    routeId: 'route-001',
    lastUpdate: new Date().toISOString(),
    status: 'active',
  };
};

export const getAssignedRoute = async (
  _driverId: string,
): Promise<Route> => {
  await new Promise<void>(resolve => setTimeout(resolve, 500));

  return {
    id: 'route-001',
    name: 'Ruta Centro - Mañana',
    zone: 'Zona Centro',
    points: mockRoutePoints,
    estimatedDuration: 120,
    status: 'active',
    assignedTruckId: 'truck-001',
    assignedDriverId: 'driver-001',
  };
};

export const getEstimatedArrival = async (
  _userLatitude: number,
  _userLongitude: number,
): Promise<{minutes: number; distance: number}> => {
  await new Promise<void>(resolve => setTimeout(resolve, 300));

  return {
    minutes: Math.floor(Math.random() * 30) + 5,
    distance: Math.floor(Math.random() * 2000) + 200,
  };
};

export const getTips = async (): Promise<Tip[]> => {
  await new Promise<void>(resolve => setTimeout(resolve, 200));

  return [
    {
      id: 'tip-1',
      message: 'Coloca la basura en un lugar accesible para el recolector',
      icon: '♻️',
    },
    {
      id: 'tip-2',
      message: 'Los trabajadores no están autorizados para entrar a casas',
      icon: '🚫',
    },
    {
      id: 'tip-3',
      message: 'Separa residuos orgánicos e inorgánicos',
      icon: '🗂️',
    },
    {
      id: 'tip-4',
      message: 'Saca la basura 15 minutos antes de que pase el camión',
      icon: '⏰',
    },
    {
      id: 'tip-5',
      message: 'No dejes bolsas rotas, usa contenedores cerrados',
      icon: '🗑️',
    },
  ];
};

const mockIncidents: Incident[] = [
  {
    id: 'inc-001',
    driverId: 'driver-001',
    routeId: 'route-001',
    type: 'road_block',
    description: 'Calle Morelos bloqueada por obras viales',
    latitude: 20.6610,
    longitude: -103.3490,
    notifiedSupervisor: true,
    alertSentToUsers: true,
    createdAt: new Date(Date.now() - 1800000).toISOString(),
  },
];

export const reportIncident = async (
  incident: Omit<Incident, 'id' | 'createdAt'>,
): Promise<Incident> => {
  await new Promise<void>(resolve => setTimeout(resolve, 600));
  const newIncident: Incident = {
    ...incident,
    id: `inc-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  mockIncidents.push(newIncident);
  return newIncident;
};

export const getDriverAlerts = async (_driverId: string): Promise<Incident[]> => {
  await new Promise<void>(resolve => setTimeout(resolve, 300));
  return mockIncidents;
};

export const getDriverHistory = async (_driverId: string) => {
  await new Promise<void>(resolve => setTimeout(resolve, 400));
  return [
    {
      id: 'hist-001',
      routeName: 'Ruta Centro - Mañana',
      date: '2026-09-25',
      durationMinutes: 115,
      status: 'completed',
      incidentsCount: 0,
    },
    {
      id: 'hist-002',
      routeName: 'Ruta Sur - Tarde',
      date: '2026-09-24',
      durationMinutes: 130,
      status: 'completed',
      incidentsCount: 1,
    },
    {
      id: 'hist-003',
      routeName: 'Ruta Norte - Mañana',
      date: '2026-09-23',
      durationMinutes: 90,
      status: 'suspended',
      incidentsCount: 1,
    },
  ];
};


