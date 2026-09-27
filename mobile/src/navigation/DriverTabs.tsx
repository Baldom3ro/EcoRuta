import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DriverHomeScreen from '../screens/driver/DriverHomeScreen';
import AlertsScreen from '../screens/driver/AlertsScreen';
import ReportIncidentScreen from '../screens/driver/ReportIncidentScreen';
import HistoryScreen from '../screens/driver/HistoryScreen';
import DriverSettingsScreen from '../screens/driver/DriverSettingsScreen';
import {useTheme} from '../context/ThemeContext';
import {Icon} from '../components/Icon';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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

const BackHeaderButton: React.FC<{navigation: any; color: string}> = ({
  navigation,
  color,
}) => (
  <TouchableOpacity
    style={styles.backBtn}
    onPress={() => {
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.navigate('AlertsTab', {screen: 'AlertsList'});
      }
    }}>
    <Icon name="arrow-left" size={22} color={color} />
  </TouchableOpacity>
);

const renderReportHeaderLeft = (stackNav: any, primaryColor: string) => {
  return <BackHeaderButton navigation={stackNav} color={primaryColor} />;
};

const renderAlertsTabListener = ({navigation}: {navigation: any}) => ({
  tabPress: () => {
    navigation.navigate('AlertsTab', {screen: 'AlertsList'});
  },
});

const AlertsStack: React.FC = () => {
  const {colors} = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="AlertsList"
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
        options={({navigation: stackNav}) => ({
          title: 'Reportar Percance',
          headerLeft: () => renderReportHeaderLeft(stackNav, colors.primary),
        })}
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
        listeners={renderAlertsTabListener}
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

const styles = StyleSheet.create({
  backBtn: {
    marginRight: 12,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
});

export default DriverTabs;
