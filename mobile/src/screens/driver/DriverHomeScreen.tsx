// Home Conductor - Mapa Interactivo OpenStreetMap con Ruta Asignada y Recorrido (HU-D01, views.md 4.4, design-system.md)
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useTheme} from '../../context/ThemeContext';
import MapView from '../../components/MapView';
import {Icon} from '../../components/Icon';
import {TruckService} from '../../services';
import {Route} from '../../services/types';
import {Typography, Spacing} from '../../theme';

const DriverHomeScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const {colors} = useTheme();
  const [route, setRoute] = useState<Route | null>(null);
  const [loading, setLoading] = useState(true);
  const [shiftStatus, setShiftStatus] = useState<'pending' | 'active' | 'completed'>('active');

  useEffect(() => {
    const fetchRoute = async () => {
      setLoading(true);
      try {
        const data = await TruckService.getAssignedRoute('driver-001');
        setRoute(data);
      } finally {
        setLoading(false);
      }
    };
    fetchRoute();
  }, []);

  const toggleShift = () => {
    setShiftStatus((prev) => (prev === 'active' ? 'pending' : 'active'));
  };

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: colors.background}]}
      contentContainerStyle={styles.content}>
      {/* Header Info de Ruta Asignada */}
      <View style={[styles.headerCard, {backgroundColor: colors.surface, borderColor: colors.border}]}>
        <View style={styles.headerTitleRow}>
          <Text style={[styles.routeName, {color: colors.primaryDark}]}>
            {route ? route.name : 'Ruta Centro - Mañana'}
          </Text>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                  shiftStatus === 'active' ? colors.success + '20' : colors.warning + '20',
              },
            ]}>
            <Text
              style={[
                styles.statusBadgeText,
                {color: shiftStatus === 'active' ? colors.success : colors.warning},
              ]}>
              ● {shiftStatus === 'active' ? 'RECORRIDO ACTIVO' : 'PAUSADO'}
            </Text>
          </View>
        </View>
        <Text style={[styles.routeMeta, {color: colors.textSecondary}]}>
          Zona: {route ? route.zone : 'Zona Centro'} • {route ? route.points.length : 6} puntos de recolección
        </Text>
      </View>

      {/* Mapa Interactivo con OpenStreetMap */}
      <View style={[styles.mapContainer, {borderColor: colors.border}]}>
        <MapView
          latitude={20.6625}
          longitude={-103.3475}
          truckLatitude={20.6610}
          truckLongitude={-103.3490}
          truckName="Mi Camión (ECO-TRUCK-001)"
          routePoints={route ? route.points : [
            {latitude: 20.6600, longitude: -103.3500, order: 1, label: 'Inicio'},
            {latitude: 20.6610, longitude: -103.3490, order: 2, label: 'Calle Morelos'},
            {latitude: 20.6625, longitude: -103.3475, order: 3, label: 'Av. Juárez'},
            {latitude: 20.6640, longitude: -103.3460, order: 4, label: 'Plaza Central'},
            {latitude: 20.6655, longitude: -103.3445, order: 5, label: 'Col. San Marcos'},
            {latitude: 20.6670, longitude: -103.3430, order: 6, label: 'Final'},
          ]}
        />
      </View>

      {/* Controles de la Ruta */}
      <View style={styles.controlsRow}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            {
              backgroundColor:
                shiftStatus === 'active' ? colors.warning : colors.primary,
            },
          ]}
          onPress={toggleShift}>
          <View style={styles.btnRow}>
            <Icon
              name={shiftStatus === 'active' ? 'pause' : 'play'}
              size={16}
              color="#FFFFFF"
            />
            <Text style={styles.actionText}>
              {shiftStatus === 'active' ? 'Pausar Recorrido' : 'Iniciar Recorrido'}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, {backgroundColor: colors.error}]}
          onPress={() => navigation.navigate('AlertsTab', {screen: 'ReportIncident'})}>
          <View style={styles.btnRow}>
            <Icon name="alert" size={16} color="#FFFFFF" />
            <Text style={styles.actionText}>Reportar Percance</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Puntos de Recolección (HU-D01) */}
      <View style={[styles.section, {backgroundColor: colors.surface, borderColor: colors.border}]}>
        <View style={styles.btnRow}>
          <Icon name="map-pin" size={18} color={colors.primaryDark} />
          <Text style={[styles.sectionTitle, {color: colors.primaryDark}]}>
            Puntos de Recolección Asignados
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : (
          route?.points.map((pt, idx) => (
            <View key={pt.order} style={styles.pointRow}>
              <View style={[styles.pointDot, {backgroundColor: idx < 2 ? colors.primary : colors.border}]}>
                <Text style={styles.pointNum}>{pt.order}</Text>
              </View>
              <View style={styles.pointInfo}>
                <Text style={[styles.pointLabel, {color: colors.text}]}>
                  {pt.label || `Punto ${pt.order}`}
                </Text>
                <Text style={[styles.pointCoords, {color: colors.textSecondary}]}>
                  {pt.latitude.toFixed(4)}, {pt.longitude.toFixed(4)}
                </Text>
              </View>
              <Text style={[styles.pointStatus, {color: idx < 2 ? colors.primary : colors.textSecondary}]}>
                {idx < 2 ? '✓ Visitado' : 'Pendiente'}
              </Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  content: {padding: Spacing.md},
  btnRow: {flexDirection: 'row', alignItems: 'center', gap: 6},
  headerCard: {
    padding: Spacing.md,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  headerTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  routeName: {
    fontSize: Typography.sizes.lg,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusBadgeText: {
    fontSize: Typography.sizes.xs,
    fontWeight: 'bold',
  },
  routeMeta: {
    fontSize: Typography.sizes.xs,
  },
  mapContainer: {
    height: 280,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: Spacing.md,
    overflow: 'hidden',
  },
  controlsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  actionButton: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionText: {color: '#FFFFFF', fontSize: Typography.sizes.xs, fontWeight: 'bold'},
  section: {
    padding: Spacing.md,
    borderRadius: 16,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: Typography.sizes.md,
    fontWeight: 'bold',
    marginBottom: Spacing.md,
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.xs,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#CCCCCC33',
  },
  pointDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  pointNum: {color: '#FFFFFF', fontSize: Typography.sizes.xs, fontWeight: 'bold'},
  pointInfo: {flex: 1},
  pointLabel: {fontSize: Typography.sizes.sm, fontWeight: '600'},
  pointCoords: {fontSize: Typography.sizes.xs},
  pointStatus: {fontSize: Typography.sizes.xs, fontWeight: 'bold'},
});

export default DriverHomeScreen;
