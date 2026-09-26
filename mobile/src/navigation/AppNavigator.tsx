// Navegador principal - decide qué mostrar según estado de auth y rol
import React, {useState, useCallback} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useAuth} from '../context/AuthContext';
import SplashScreen from '../screens/auth/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import CitizenTabs from './CitizenTabs';
import DriverTabs from './DriverTabs';

const AppNavigator: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const {user} = useAuth();

  const handleSplashFinish = useCallback(() => {
    setShowSplash(false);
  }, []);

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <NavigationContainer>
      {!user ? (
        <LoginScreen />
      ) : user.role === 'driver' ? (
        <DriverTabs />
      ) : (
        <CitizenTabs />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
