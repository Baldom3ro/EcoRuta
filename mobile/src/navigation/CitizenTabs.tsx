// Stack de navegación del ciudadano
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, StyleSheet} from 'react-native';
import CitizenHomeScreen from '../screens/citizen/CitizenHomeScreen';
import NotificationsScreen from '../screens/citizen/NotificationsScreen';
import MyReportsScreen from '../screens/citizen/MyReportsScreen';
import CreateReportScreen from '../screens/citizen/CreateReportScreen';
import SettingsScreen from '../screens/citizen/SettingsScreen';
import {useTheme} from '../context/ThemeContext';

const Tab = createBottomTabNavigator();
const ReportsStack = createNativeStackNavigator();

const styles = StyleSheet.create({
  tabIcon: {
    fontSize: 20,
  },
});

const renderHomeIcon = ({color}: {color: string}) => (
  <Text style={[styles.tabIcon, {color}]}>🏠</Text>
);
const renderBellIcon = ({color}: {color: string}) => (
  <Text style={[styles.tabIcon, {color}]}>🔔</Text>
);
const renderReportIcon = ({color}: {color: string}) => (
  <Text style={[styles.tabIcon, {color}]}>📋</Text>
);
const renderSettingsIcon = ({color}: {color: string}) => (
  <Text style={[styles.tabIcon, {color}]}>⚙️</Text>
);

// Stack de reportes: Mis Reportes → Crear Reporte
const ReportsStackScreen: React.FC = () => {
  const {colors} = useTheme();

  return (
    <ReportsStack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: colors.surface},
        headerTintColor: colors.text,
      }}>
      <ReportsStack.Screen
        name="MyReports"
        component={MyReportsScreen}
        options={{title: 'Mis Reportes'}}
      />
      <ReportsStack.Screen
        name="CreateReport"
        component={CreateReportScreen}
        options={{title: 'Nuevo Reporte'}}
      />
    </ReportsStack.Navigator>
  );
};

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
          tabBarIcon: renderHomeIcon,
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          title: 'Alertas',
          tabBarIcon: renderBellIcon,
        }}
      />
      <Tab.Screen
        name="Reports"
        component={ReportsStackScreen}
        options={{
          title: 'Reportes',
          headerShown: false,
          tabBarIcon: renderReportIcon,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Ajustes',
          tabBarIcon: renderSettingsIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default CitizenTabs;
