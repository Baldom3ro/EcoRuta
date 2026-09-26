// Stack y Tabs de navegación del conductor (HU-D01, HU-D02, HU-D03, HU-D04)
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text} from 'react-native';
import DriverHomeScreen from '../screens/driver/DriverHomeScreen';
import AlertsScreen from '../screens/driver/AlertsScreen';
import ReportIncidentScreen from '../screens/driver/ReportIncidentScreen';
import HistoryScreen from '../screens/driver/HistoryScreen';
import DriverSettingsScreen from '../screens/driver/DriverSettingsScreen';
import {useTheme} from '../context/ThemeContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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
          tabBarIcon: ({color}) => <Text style={{color, fontSize: 20}}>🗺️</Text>,
        }}
      />
      <Tab.Screen
        name="AlertsTab"
        component={AlertsStack}
        options={{
          headerShown: false,
          title: 'Alertas',
          tabBarIcon: ({color}) => <Text style={{color, fontSize: 20}}>⚠️</Text>,
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          title: 'Historial',
          tabBarIcon: ({color}) => <Text style={{color, fontSize: 20}}>📊</Text>,
        }}
      />
      <Tab.Screen
        name="DriverSettings"
        component={DriverSettingsScreen}
        options={{
          title: 'Ajustes',
          tabBarIcon: ({color}) => <Text style={{color, fontSize: 20}}>⚙️</Text>,
        }}
      />
    </Tab.Navigator>
  );
};

export default DriverTabs;
