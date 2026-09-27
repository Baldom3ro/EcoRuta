// Mock de reportes ciudadanos
import {Report} from '../types';

const mockReports: Report[] = [
  {
    id: 'report-001',
    userId: 'citizen-001',
    userName: 'María García',
    type: 'missed_pickup',
    description: 'Hoy no pasó el camión de basura por mi calle',
    latitude: 20.4520,
    longitude: -97.0890,
    address: 'Calle Revolución #123, Gutiérrez Zamora',
    status: 'pending',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'report-002',
    userId: 'citizen-002',
    userName: 'Juan López',
    type: 'overflowing',
    description: 'Contenedor desbordado cerca del Parque Central',
    photoUrl: 'https://picsum.photos/400/300',
    latitude: 20.4536,
    longitude: -97.0876,
    address: 'Av. Manuel Ávila Camacho esq. Hidalgo',
    status: 'in_review',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
];

export const getMyReports = async (_userId: string): Promise<Report[]> => {
  await new Promise<void>(resolve => setTimeout(resolve, 500));
  return mockReports.filter(r => r.userId === _userId);
};

export const getReportsByZone = async (_zone: string): Promise<Report[]> => {
  await new Promise<void>(resolve => setTimeout(resolve, 500));
  return mockReports;
};

export const createReport = async (
  report: Omit<Report, 'id' | 'status' | 'createdAt'>,
): Promise<Report> => {
  await new Promise<void>(resolve => setTimeout(resolve, 800));

  const newReport: Report = {
    ...report,
    id: `report-${Date.now()}`,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  mockReports.push(newReport);
  return newReport;
};

export const updateReportStatus = async (
  reportId: string,
  status: 'pending' | 'in_review' | 'resolved',
): Promise<Report | null> => {
  await new Promise<void>(resolve => setTimeout(resolve, 300));
  const report = mockReports.find(r => r.id === reportId);
  if (report) {
    report.status = status;
    return {...report};
  }
  return null;
};
