// Stack y Tabs de navegación del conductor (HU-D01, HU-D02, HU-D03, HU-D04)
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DriverHomeScreen from '../screens/driver/DriverHomeScreen';
import AlertsScreen from '../screens/driver/AlertsScreen';
import ReportIncidentScreen from '../screens/driver/ReportIncidentScreen';
import HistoryScreen from '../screens/driver/HistoryScreen';
import DriverSettingsScreen from '../screens/driver/DriverSettingsScreen';
import {useTheme} from '../context/ThemeContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

import {Icon} from '../components/Icon';

const renderRouteIcon = ({color}: {color: string}) => (
  <Icon name="truck" size={20} color={color} />
);
const renderAlertIcon = ({color}: {color: string}) => (
  <Icon name="alert" size={20} color={color} />
);
const renderHistoryIcon = ({color}: {color: string}) => (
  <Icon name="history" size={20} color={color} />
);
const renderSettingsIcon = ({color}: {color: string}) => (
  <Icon name="settings" size={20} color={color} />
);

const AlertsStack: React.FC = () => {
  const {colors} = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: colors.surface},
        headerTintColor: colors.text,
      }}>
      <Stack.Screen
        name="AlertsList"
        component={AlertsScreen}
        options={{title: 'Alertas de Zona'}}
      />
      <Stack.Screen
        name="ReportIncident"
        component={ReportIncidentScreen}
        options={{title: 'Reportar Percance'}}
      />
    </Stack.Navigator>
  );
};

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
          title: 'Mi Ruta',
          tabBarIcon: renderRouteIcon,
        }}
      />
      <Tab.Screen
        name="AlertsTab"
        component={AlertsStack}
        options={{
          headerShown: false,
          title: 'Alertas',
          tabBarIcon: renderAlertIcon,
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          title: 'Historial',
          tabBarIcon: renderHistoryIcon,
        }}
      />
      <Tab.Screen
        name="DriverSettings"
        component={DriverSettingsScreen}
        options={{
          title: 'Ajustes',
          tabBarIcon: renderSettingsIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default DriverTabs;
