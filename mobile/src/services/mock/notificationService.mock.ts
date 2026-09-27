// Mock de notificaciones
import {Notification, Incident} from '../types';

const mockNotifications: Notification[] = [
  {
    id: 'notif-001',
    type: 'proximity',
    title: '¡Camión cerca!',
    message: 'El camión de basura está a 500m de tu zona',
    read: false,
    createdAt: new Date(Date.now() - 600000).toISOString(),
  },
  {
    id: 'notif-002',
    type: 'time_estimate',
    title: 'Estimación de llegada',
    message: 'El camión pasará en aproximadamente 15 minutos',
    read: false,
    createdAt: new Date(Date.now() - 1200000).toISOString(),
  },
  {
    id: 'notif-003',
    type: 'tip',
    title: 'Consejo del día',
    message: 'Recuerda separar tus residuos orgánicos e inorgánicos',
    read: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export const getNotifications = async (
  _userId: string,
): Promise<Notification[]> => {
  await new Promise<void>(resolve => setTimeout(resolve, 400));
  return mockNotifications;
};

export const markAsRead = async (notificationId: string): Promise<void> => {
  await new Promise<void>(resolve => setTimeout(resolve, 200));
  const notif = mockNotifications.find(n => n.id === notificationId);
  if (notif) {
    notif.read = true;
  }
};

export const reportIncident = async (
  incident: Omit<Incident, 'id' | 'createdAt'>,
): Promise<Incident> => {
  await new Promise<void>(resolve => setTimeout(resolve, 800));

  return {
    ...incident,
    id: `incident-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
};

export const sendZoneAlert = async (
  _routeId: string,
  _zone: string,
  _message: string,
): Promise<{sent: boolean; usersNotified: number}> => {
  await new Promise<void>(resolve => setTimeout(resolve, 1000));

  // Simula envío de alerta masiva
  return {
    sent: true,
    usersNotified: Math.floor(Math.random() * 50) + 10,
  };
};
