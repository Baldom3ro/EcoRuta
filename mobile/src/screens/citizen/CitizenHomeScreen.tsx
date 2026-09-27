// Home Ciudadano (Estructura fiel a wireframes.md 3.3, views.md y design-system.md)
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useTheme} from '../../context/ThemeContext';
import {useAuth} from '../../context/AuthContext';
import MapView from '../../components/MapView';
import {Icon} from '../../components/Icon';
import {TruckService, NotificationService} from '../../services';
import {TruckLocation, Tip, Notification} from '../../services/types';
import {Typography, Spacing, BorderRadius} from '../../theme';

const CitizenHomeScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const {colors} = useTheme();
  const {user} = useAuth();
  const [truckLoc, setTruckLoc] = useState<TruckLocation | null>(null);
  const [tips, setTips] = useState<Tip[]>([]);
  const [recentNotifs, setRecentNotifs] = useState<Notification[]>([]);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const loc = await TruckService.getTruckLocation();
        const tipsData = await TruckService.getTips();
        const notifs = await NotificationService.getNotifications(user?.id || 'citizen-001');
        setTruckLoc(loc);
        setTips(tipsData);
        setRecentNotifs(notifs.slice(0, 2));
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
    <ScrollView
      style={[styles.container, {backgroundColor: colors.background}]}
      contentContainerStyle={styles.content}>
      {/* Top Bar (wireframes.md 3.3) */}
      <View style={[styles.topBar, {backgroundColor: colors.surface, borderColor: colors.border}]}>
        <View style={styles.userInfo}>
          <Text style={[styles.greeting, {color: colors.textSecondary}]}>
            Hola, {user?.name || 'María García'}
          </Text>
          <View style={[styles.zoneBadge, {backgroundColor: colors.primaryLight + '40'}]}>
            <View style={styles.badgeRow}>
              <Icon name="map-pin" size={12} color={colors.primaryDark} />
              <Text style={[styles.zoneText, {color: colors.primaryDark}]}>
                {user?.zone || 'Zona Centro'}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.notifBtn, {backgroundColor: colors.background}]}
          onPress={() => navigation.navigate('Notifications')}>
          <Icon name="bell" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Tarjeta Estado del Servicio / ETA (wireframes.md 3.3) */}
      <View
        style={[
          styles.etaCard,
          {backgroundColor: colors.primary, shadowColor: colors.shadow},
        ]}>
        <View style={styles.etaHeader}>
          <View style={styles.badgeRow}>
            <Icon name="truck" size={14} color="#FFFFFF" />
            <Text style={styles.etaBadgeText}>RUTA CENTRO - MAÑANA</Text>
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

      {/* Mapa Interactivo OpenStreetMap (wireframes.md 3.3) */}
      <View style={[styles.mapCard, {borderColor: colors.border}]}>
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

      {/* Botones de Acción (wireframes.md 3.3) */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={[styles.actionBtn, {backgroundColor: colors.secondary}]}
          onPress={() => navigation.navigate('Reports')}>
          <View style={styles.btnRow}>
            <Icon name="alert" size={18} color="#FFFFFF" />
            <Text style={styles.actionBtnText}>Reportar Problema</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Notificaciones Recientes (wireframes.md 3.3) */}
      {recentNotifs.length > 0 && (
        <View style={[styles.sectionCard, {backgroundColor: colors.surface, borderColor: colors.border}]}>
          <View style={styles.sectionHeader}>
            <View style={styles.btnRow}>
              <Icon name="bell" size={16} color={colors.primaryDark} />
              <Text style={[styles.sectionTitle, {color: colors.primaryDark}]}>
                Notificaciones Recientes
              </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
              <Text style={[styles.seeAllText, {color: colors.secondary}]}>Ver todas</Text>
            </TouchableOpacity>
          </View>
          {recentNotifs.map(item => (
            <View key={item.id} style={styles.notifItem}>
              <View style={styles.iconWrapper}>
                <Icon
                  name={
                    item.type === 'proximity'
                      ? 'map-pin'
                      : item.type === 'time_estimate'
                      ? 'clock'
                      : 'lightbulb'
                  }
                  size={18}
                  color={colors.primary}
                />
              </View>
              <View style={styles.notifTextContainer}>
                <Text style={[styles.notifTitle, {color: colors.text}]}>{item.title}</Text>
                <Text style={[styles.notifMsg, {color: colors.textSecondary}]}>{item.message}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Consejos (HU-C05) */}
      {tips.length > 0 && (
        <TouchableOpacity
          style={[
            styles.tipCard,
            {backgroundColor: colors.surface, borderColor: colors.border},
          ]}
          onPress={nextTip}>
          <View style={styles.tipIconWrapper}>
            <Icon name="lightbulb" size={24} color={colors.primary} />
          </View>
          <View style={styles.tipBody}>
            <Text style={[styles.tipTitle, {color: colors.primary}]}>
              Consejo de Recolección #{currentTipIndex + 1}
            </Text>
            <Text style={[styles.tipText, {color: colors.text}]}>
              {tips[currentTipIndex]?.message}
            </Text>
          </View>
          <Icon name="chevron-right" size={18} color={colors.textSecondary} />
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  content: {padding: Spacing.md},
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  userInfo: {flex: 1},
  greeting: {fontSize: Typography.sizes.md, fontWeight: 'bold'},
  badgeRow: {flexDirection: 'row', alignItems: 'center', gap: 4},
  btnRow: {flexDirection: 'row', alignItems: 'center', gap: 6},
  iconWrapper: {marginRight: Spacing.sm, width: 28, alignItems: 'center'},
  tipIconWrapper: {marginRight: Spacing.sm, width: 32, alignItems: 'center'},
  zoneBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
    marginTop: 4,
  },
  zoneText: {fontSize: Typography.sizes.xs, fontWeight: 'bold'},
  notifBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifBtnText: {fontSize: 20},
  etaCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    elevation: 3,
  },
  etaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  etaBadgeText: {color: '#FFFFFF', fontSize: Typography.sizes.xs, fontWeight: 'bold'},
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
  etaLabel: {color: 'rgba(255,255,255,0.8)', fontSize: Typography.sizes.xs},
  etaValue: {color: '#FFFFFF', fontSize: Typography.sizes.lg, fontWeight: 'bold', marginTop: 2},
  etaDivider: {width: 1, height: 30, backgroundColor: 'rgba(255,255,255,0.3)'},
  mapCard: {
    height: 280,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.md,
    overflow: 'hidden',
  },
  actionsRow: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  actionBtn: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  actionBtnText: {color: '#FFFFFF', fontSize: Typography.sizes.sm, fontWeight: 'bold'},
  sectionCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  sectionTitle: {fontSize: Typography.sizes.sm, fontWeight: 'bold'},
  seeAllText: {fontSize: Typography.sizes.xs, fontWeight: 'bold'},
  notifItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.xs,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#CCCCCC33',
  },
  notifIcon: {fontSize: 20, marginRight: Spacing.sm},
  notifTextContainer: {flex: 1},
  notifTitle: {fontSize: Typography.sizes.xs, fontWeight: 'bold'},
  notifMsg: {fontSize: Typography.sizes.xs},
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
  },
  tipIcon: {fontSize: 28, marginRight: Spacing.sm},
  tipBody: {flex: 1},
  tipTitle: {fontSize: Typography.sizes.xs, fontWeight: 'bold', marginBottom: 2},
  tipText: {fontSize: Typography.sizes.sm},
  tipNext: {fontSize: Typography.sizes.xs, marginLeft: Spacing.xs},
});

export default CitizenHomeScreen;
