// Mock de autenticación
import {User} from '../types';

const mockUsers: User[] = [
  {
    id: 'citizen-001',
    name: 'María García',
    email: 'maria@gmail.com',
    role: 'citizen',
    photoUrl: 'https://i.pravatar.cc/150?img=1',
    zone: 'Zona Centro',
  },
  {
    id: 'driver-001',
    name: 'Carlos Rodríguez',
    email: 'carlos@ecoruta.com',
    role: 'driver',
    photoUrl: 'https://i.pravatar.cc/150?img=3',
    zone: 'Zona Centro',
  },
];

export const loginWithGoogle = async (): Promise<User> => {
  // Simula delay de red
  await new Promise<void>(resolve => setTimeout(resolve, 1000));
  return mockUsers[0]; // retorna ciudadano por defecto
};

export const loginWithFacebook = async (): Promise<User> => {
  await new Promise<void>(resolve => setTimeout(resolve, 1000));
  return mockUsers[0];
};

export const loginAsDriver = async (
  _email: string,
  _password: string,
): Promise<User> => {
  await new Promise<void>(resolve => setTimeout(resolve, 1000));
  return mockUsers[1];
};

export const logout = async (): Promise<void> => {
  await new Promise<void>(resolve => setTimeout(resolve, 500));
};

export const getCurrentUser = async (): Promise<User | null> => {
  await new Promise<void>(resolve => setTimeout(resolve, 300));
  return null; // no hay sesión activa por defecto
};
