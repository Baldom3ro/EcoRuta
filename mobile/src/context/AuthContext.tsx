// Contexto de autenticación global
import React, {createContext, useContext, useState, useCallback} from 'react';
import {User} from '../services/types';
import {AuthService} from '../services';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  loginAsDriver: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loginWithGoogle = useCallback(async () => {
    setIsLoading(true);
    try {
      const loggedUser = await AuthService.loginWithGoogle();
      setUser(loggedUser);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginWithFacebook = useCallback(async () => {
    setIsLoading(true);
    try {
      const loggedUser = await AuthService.loginWithFacebook();
      setUser(loggedUser);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginAsDriver = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      try {
        const loggedUser = await AuthService.loginAsDriver(email, password);
        setUser(loggedUser);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const handleLogout = useCallback(async () => {
    setIsLoading(true);
    try {
      await AuthService.logout();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        loginWithGoogle,
        loginWithFacebook,
        loginAsDriver,
        logout: handleLogout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};
