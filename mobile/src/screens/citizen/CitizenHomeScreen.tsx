// Home Ciudadano - Mapa a Pantalla Completa con Islas Flotantes (GIS Style)
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '../../context/ThemeContext';
import {useAuth} from '../../context/AuthContext';
import MapView from '../../components/MapView';
import {Icon} from '../../components/Icon';
import {TruckService, NotificationService} from '../../services';
import {TruckLocation, Tip} from '../../services/types';
import {Typography, Spacing, BorderRadius} from '../../theme';

const CitizenHomeScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const {colors} = useTheme();
  const {user} = useAuth();
  const [truckLoc, setTruckLoc] = useState<TruckLocation | null>(null);
  const [tips, setTips] = useState<Tip[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const loc = await TruckService.getTruckLocation();
        const tipsData = await TruckService.getTips();
        const notifs = await NotificationService.getNotifications(user?.id || 'citizen-001');
        setTruckLoc(loc);
        setTips(tipsData);
        setUnreadCount(notifs.filter(n => !n.read).length);
      } catch {
        // Ignorar
      }
    };
    loadData();

    const interval = setInterval(async () => {
      const updatedLoc = await TruckService.getTruckLocation();
      setTruckLoc(updatedLoc);
    }, 5000);

    return () => clearInterval(interval);
  }, [user]);

  const nextTip = () => {
    if (tips.length > 0) {
      setCurrentTipIndex(prev => (prev + 1) % tips.length);
    }
  };

  return (
    <View style={styles.container}>
      {/* 1. MAPA COMPLETO DE FONDO (FULLSCREEN BACKGROUND) */}
      <View style={StyleSheet.absoluteFill}>
        <MapView
          latitude={20.4536}
          longitude={-97.0876}
          truckLatitude={truckLoc ? truckLoc.latitude : 20.4520}
          truckLongitude={truckLoc ? truckLoc.longitude : -97.0890}
          truckName={truckLoc ? truckLoc.driverName : 'Carlos Rodríguez'}
          routePoints={[
            {latitude: 20.4500, longitude: -97.0910, order: 1, label: 'Entrada Norte - Av. Hidalgo'},
            {latitude: 20.4520, longitude: -97.0890, order: 2, label: 'Calle Revolución'},
            {latitude: 20.4536, longitude: -97.0876, order: 3, label: 'Parque Central Gutiérrez Zamora'},
            {latitude: 20.4550, longitude: -97.0850, order: 4, label: 'Malecón Río Tecolutla'},
            {latitude: 20.4570, longitude: -97.0820, order: 5, label: 'Colonia El Carmen'},
          ]}
        />
      </View>

      {/* 2. ISLA FLOTANTE SUPERIOR: ZONA & BOTÓN NOTIFICACIONES CON CONTADOR */}
      <View style={styles.topFloatingBar}>
        <View
          style={[
            styles.floatingZoneBadge,
            {backgroundColor: colors.surface, borderColor: colors.border},
          ]}>
          <Icon name="map-pin" size={14} color={colors.primary} />
          <Text style={[styles.floatingZoneText, {color: colors.text}]}>
            {user?.zone || 'Gutiérrez Zamora'}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.floatingNotifBtn,
            {backgroundColor: colors.surface, borderColor: colors.border},
          ]}
          onPress={() => navigation.navigate('Notifications')}>
          <Icon name="bell" size={20} color={colors.primary} />
          {unreadCount > 0 && (
            <View style={[styles.unreadBadge, {backgroundColor: colors.error}]}>
              <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* 3. ISLA FLOTANTE ETA: TIEMPO ESTIMADO Y DISTANCIA */}
      <View style={[styles.floatingEtaCard, {backgroundColor: colors.primary}]}>
        <View style={styles.etaHeader}>
          <View style={styles.badgeRow}>
            <Icon name="truck" size={14} color="#FFFFFF" />
            <Text style={styles.etaBadgeText}>RUTA CENTRO - G. ZAMORA</Text>
          </View>
          <Text style={styles.etaStatusText}>EN CAMINO</Text>
        </View>
        <View style={styles.etaDetailsRow}>
          <View>
            <Text style={styles.etaLabel}>Tiempo Estimado (ETA)</Text>
            <Text style={styles.etaValue}>~15 minutos</Text>
          </View>
          <View style={styles.etaDivider} />
          <View>
            <Text style={styles.etaLabel}>Distancia Faltante</Text>
            <Text style={styles.etaValue}>450 metros</Text>
          </View>
        </View>
      </View>

      {/* 4. ISLAS FLOTANTES INFERIORES: TIP DE RECOLECCIÓN Y BOTÓN REPORTAR */}
      <View style={styles.bottomFloatingContainer}>
        {tips.length > 0 && (
          <TouchableOpacity
            style={[
              styles.floatingTipCard,
              {backgroundColor: colors.surface, borderColor: colors.border},
            ]}
            onPress={nextTip}>
            <Icon name="lightbulb" size={18} color={colors.primary} />
            <Text style={[styles.floatingTipText, {color: colors.text}]} numberOfLines={1}>
              {tips[currentTipIndex]?.message}
            </Text>
            <Icon name="chevron-right" size={16} color={colors.textSecondary} />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.floatingReportBtn, {backgroundColor: colors.secondary}]}
          onPress={() => navigation.navigate('Reports')}>
          <View style={styles.btnRow}>
            <Icon name="alert" size={18} color="#FFFFFF" />
            <Text style={styles.floatingReportBtnText}>Reportar Problema</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  topFloatingBar: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
    right: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  floatingZoneBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  floatingZoneText: {
    fontSize: Typography.sizes.xs,
    fontWeight: 'bold',
  },
  floatingNotifBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    position: 'relative',
  },
  unreadBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  unreadBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  floatingEtaCard: {
    position: 'absolute',
    top: 66,
    left: Spacing.md,
    right: Spacing.md,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    elevation: 6,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    zIndex: 10,
  },
  etaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  etaBadgeText: {
    color: '#FFFFFF',
    fontSize: Typography.sizes.xs,
    fontWeight: 'bold',
  },
  etaStatusText: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: '#FFFFFF',
    fontSize: Typography.sizes.xs,
    fontWeight: 'bold',
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
  },
  etaDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: Spacing.xs,
  },
  etaLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: Typography.sizes.xs,
  },
  etaValue: {
    color: '#FFFFFF',
    fontSize: Typography.sizes.md,
    fontWeight: 'bold',
    marginTop: 2,
  },
  etaDivider: {
    width: 1,
    height: 28,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  bottomFloatingContainer: {
    position: 'absolute',
    bottom: Spacing.md,
    left: Spacing.md,
    right: Spacing.md,
    gap: Spacing.sm,
    zIndex: 10,
  },
  floatingTipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  floatingTipText: {
    flex: 1,
    fontSize: Typography.sizes.xs,
  },
  floatingReportBtn: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  btnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  floatingReportBtnText: {
    color: '#FFFFFF',
    fontSize: Typography.sizes.md,
    fontWeight: 'bold',
  },
});

export default CitizenHomeScreen;
