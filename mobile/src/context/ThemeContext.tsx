// Contexto de tema (claro/oscuro automático)
import React, {createContext, useContext, useState, useEffect} from 'react';
import {Appearance} from 'react-native';
import {Colors} from '../theme';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  colors: typeof Colors.light;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [mode, setMode] = useState<ThemeMode>(
    Appearance.getColorScheme() === 'dark' ? 'dark' : 'light',
  );

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      setMode(colorScheme === 'dark' ? 'dark' : 'light');
    });
    return () => subscription.remove();
  }, []);

  const toggleTheme = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const colors = mode === 'dark' ? Colors.dark : Colors.light;

  return (
    <ThemeContext.Provider value={{mode, colors, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe usarse dentro de ThemeProvider');
  }
  return context;
};
