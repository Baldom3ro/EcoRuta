// Stack de navegación del conductor
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';
import DriverHomeScreen from '../screens/driver/DriverHomeScreen';
import {useTheme} from '../context/ThemeContext';

const Tab = createBottomTabNavigator();

// Pantallas placeholder (se crearán en siguientes commits)
const AlertsPlaceholder = () => (
  <Text style={{flex: 1, textAlign: 'center', marginTop: 100}}>
    Alertas
  </Text>
);
const HistoryPlaceholder = () => (
  <Text style={{flex: 1, textAlign: 'center', marginTop: 100}}>
    Historial
  </Text>
);
const DriverSettingsPlaceholder = () => (
  <Text style={{flex: 1, textAlign: 'center', marginTop: 100}}>
    Configuración
  </Text>
);

const DriverTabs: React.FC = () => {
  const {colors} = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {backgroundColor: colors.surface, borderTopColor: colors.border},
        headerStyle: {backgroundColor: colors.surface},
        headerTintColor: colors.text,
      }}>
      <Tab.Screen
        name="DriverHome"
        component={DriverHomeScreen}
        options={{
          title: 'Ruta',
          tabBarIcon: ({color}) => <Text style={{color, fontSize: 20}}>🗺️</Text>,
        }}
      />
      <Tab.Screen
        name="Alerts"
        component={AlertsPlaceholder}
        options={{
          title: 'Alertas',
          tabBarIcon: ({color}) => <Text style={{color, fontSize: 20}}>⚠️</Text>,
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryPlaceholder}
        options={{
          title: 'Historial',
          tabBarIcon: ({color}) => <Text style={{color, fontSize: 20}}>📊</Text>,
        }}
      />
      <Tab.Screen
        name="DriverSettings"
        component={DriverSettingsPlaceholder}
        options={{
          title: 'Ajustes',
          tabBarIcon: ({color}) => <Text style={{color, fontSize: 20}}>⚙️</Text>,
        }}
      />
    </Tab.Navigator>
  );
};

export default DriverTabs;
