// Home Conductor - Vista principal operador con Ruta Asignada y Control de Recorrido (HU-D01)
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
    if (shiftStatus === 'active') {
      setShiftStatus('pending');
    } else {
      setShiftStatus('active');
    }
  };

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: colors.background}]}
      contentContainerStyle={styles.content}>
      {/* Mapa simulado de la ruta asignada */}
      <View style={[styles.mapContainer, {backgroundColor: colors.surface, borderColor: colors.border}]}>
        <Text style={[styles.mapIcon]}>🗺️</Text>
        <Text style={[styles.mapTitle, {color: colors.text}]}>
          {route ? route.name : 'Ruta Centro - Mañana'}
        </Text>
        <Text style={[styles.mapSub, {color: colors.textSecondary}]}>
          {route ? `${route.points.length} puntos de recolección • ~${route.estimatedDuration} min` : 'Cargando datos...'}
        </Text>

        <View style={styles.mapStatusBadge}>
          <Text style={[styles.statusBadgeText, {color: shiftStatus === 'active' ? colors.success : colors.warning}]}>
            ● {shiftStatus === 'active' ? 'EN RECORRIDO' : 'PAUSADO'}
          </Text>
        </View>
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
          <Text style={styles.actionText}>
            {shiftStatus === 'active' ? '⏸️ Pausar Recorrido' : '▶️ Iniciar Recorrido'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, {backgroundColor: colors.error}]}
          onPress={() => navigation.navigate('Alerts')}>
          <Text style={styles.actionText}>🚨 Reportar Percance</Text>
        </TouchableOpacity>
      </View>

      {/* Puntos de Recolección (HU-D01) */}
      <View style={[styles.section, {backgroundColor: colors.surface, borderColor: colors.border}]}>
        <Text style={[styles.sectionTitle, {color: colors.text}]}>
          📍 Puntos de Recolección Asignados
        </Text>

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
  mapContainer: {
    height: 180,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
    position: 'relative',
  },
  mapIcon: {fontSize: 36, marginBottom: Spacing.xs},
  mapTitle: {fontSize: Typography.sizes.lg, fontWeight: 'bold'},
  mapSub: {fontSize: Typography.sizes.xs, marginTop: 2},
  mapStatusBadge: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {fontSize: Typography.sizes.xs, fontWeight: 'bold'},
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
