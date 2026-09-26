// Mock de reportes ciudadanos
import {Report} from '../types';

const mockReports: Report[] = [
  {
    id: 'report-001',
    userId: 'citizen-001',
    userName: 'María García',
    type: 'missed_pickup',
    description: 'Hoy no pasó el camión de basura por mi calle',
    latitude: 20.6615,
    longitude: -103.3485,
    address: 'Calle Morelos #123',
    status: 'pending',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'report-002',
    userId: 'citizen-002',
    userName: 'Juan López',
    type: 'overflowing',
    description: 'Contenedor desbordado en la esquina',
    photoUrl: 'https://picsum.photos/400/300',
    latitude: 20.6630,
    longitude: -103.3470,
    address: 'Av. Juárez esq. Hidalgo',
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
