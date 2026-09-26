// Stack de navegación del ciudadano
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';
import CitizenHomeScreen from '../screens/citizen/CitizenHomeScreen';
import {useTheme} from '../context/ThemeContext';

const Tab = createBottomTabNavigator();

// Pantallas placeholder (se crearán en siguientes commits)
const NotificationsPlaceholder = () => (
  <Text style={{flex: 1, textAlign: 'center', marginTop: 100}}>
    Notificaciones
  </Text>
);
const ReportsPlaceholder = () => (
  <Text style={{flex: 1, textAlign: 'center', marginTop: 100}}>
    Mis Reportes
  </Text>
);
const SettingsPlaceholder = () => (
  <Text style={{flex: 1, textAlign: 'center', marginTop: 100}}>
    Configuración
  </Text>
);

const CitizenTabs: React.FC = () => {
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
        name="CitizenHome"
        component={CitizenHomeScreen}
        options={{
          title: 'Inicio',
          tabBarIcon: ({color}) => <Text style={{color, fontSize: 20}}>🏠</Text>,
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsPlaceholder}
        options={{
          title: 'Alertas',
          tabBarIcon: ({color}) => <Text style={{color, fontSize: 20}}>🔔</Text>,
        }}
      />
      <Tab.Screen
        name="Reports"
        component={ReportsPlaceholder}
        options={{
          title: 'Reportes',
          tabBarIcon: ({color}) => <Text style={{color, fontSize: 20}}>📋</Text>,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsPlaceholder}
        options={{
          title: 'Ajustes',
          tabBarIcon: ({color}) => <Text style={{color, fontSize: 20}}>⚙️</Text>,
        }}
      />
    </Tab.Navigator>
  );
};

export default CitizenTabs;
