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
            <Text style={[styles.zoneText, {color: colors.primaryDark}]}>
              📍 {user?.zone || 'Zona Centro'}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.notifBtn, {backgroundColor: colors.background}]}
          onPress={() => navigation.navigate('Notifications')}>
          <Text style={styles.notifBtnText}>🔔</Text>
        </TouchableOpacity>
      </View>

      {/* Tarjeta Estado del Servicio / ETA (wireframes.md 3.3) */}
      <View
        style={[
          styles.etaCard,
          {backgroundColor: colors.primary, shadowColor: colors.shadow},
        ]}>
        <View style={styles.etaHeader}>
          <Text style={styles.etaBadgeText}>● RUTA CENTRO - MAÑANA</Text>
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
          latitude={20.6625}
          longitude={-103.3475}
          truckLatitude={truckLoc ? truckLoc.latitude : 20.6610}
          truckLongitude={truckLoc ? truckLoc.longitude : -103.3490}
          truckName={truckLoc ? truckLoc.driverName : 'Carlos Rodríguez'}
          routePoints={[
            {latitude: 20.6600, longitude: -103.3500, order: 1, label: 'Inicio Ruta'},
            {latitude: 20.6610, longitude: -103.3490, order: 2, label: 'Calle Morelos'},
            {latitude: 20.6625, longitude: -103.3475, order: 3, label: 'Av. Juárez'},
            {latitude: 20.6640, longitude: -103.3460, order: 4, label: 'Plaza Central'},
            {latitude: 20.6655, longitude: -103.3445, order: 5, label: 'Col. San Marcos'},
          ]}
        />
      </View>

      {/* Botones de Acción (wireframes.md 3.3) */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={[styles.actionBtn, {backgroundColor: colors.secondary}]}
          onPress={() => navigation.navigate('Reports')}>
          <Text style={styles.actionBtnText}>🚨 Reportar Problema</Text>
        </TouchableOpacity>
      </View>

      {/* Notificaciones Recientes (wireframes.md 3.3) */}
      {recentNotifs.length > 0 && (
        <View style={[styles.sectionCard, {backgroundColor: colors.surface, borderColor: colors.border}]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, {color: colors.primaryDark}]}>
              🔔 Notificaciones Recientes
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
              <Text style={[styles.seeAllText, {color: colors.secondary}]}>Ver todas</Text>
            </TouchableOpacity>
          </View>
          {recentNotifs.map(item => (
            <View key={item.id} style={styles.notifItem}>
              <Text style={styles.notifIcon}>
                {item.type === 'proximity' ? '📍' : item.type === 'time_estimate' ? '⏰' : '💡'}
              </Text>
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
          <Text style={styles.tipIcon}>{tips[currentTipIndex]?.icon || '💡'}</Text>
          <View style={styles.tipBody}>
            <Text style={[styles.tipTitle, {color: colors.primary}]}>
              Consejo de Recolección #{currentTipIndex + 1}
            </Text>
            <Text style={[styles.tipText, {color: colors.text}]}>
              {tips[currentTipIndex]?.message}
            </Text>
          </View>
          <Text style={[styles.tipNext, {color: colors.textSecondary}]}>▶</Text>
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
