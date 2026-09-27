// Home Conductor - Mapa a Pantalla Completa con Islas Flotantes y Desplegable de Puntos (GIS Style)
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useTheme} from '../../context/ThemeContext';
import MapView from '../../components/MapView';
import {Icon} from '../../components/Icon';
import {TruckService} from '../../services';
import {Route} from '../../services/types';
import {Typography, Spacing, BorderRadius} from '../../theme';

const DriverHomeScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const {colors} = useTheme();
  const [route, setRoute] = useState<Route | null>(null);
  const [loading, setLoading] = useState(true);
  const [shiftStatus, setShiftStatus] = useState<'pending' | 'active' | 'completed'>('active');
  const [showAllPointsModal, setShowAllPointsModal] = useState(false);

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

  const points = route?.points || [
    {latitude: 20.4500, longitude: -97.0910, order: 1, label: 'Entrada Norte - Av. Hidalgo'},
    {latitude: 20.4520, longitude: -97.0890, order: 2, label: 'Calle Revolución'},
    {latitude: 20.4536, longitude: -97.0876, order: 3, label: 'Parque Central Gutiérrez Zamora'},
    {latitude: 20.4550, longitude: -97.0850, order: 4, label: 'Malecón Río Tecolutla'},
    {latitude: 20.4570, longitude: -97.0820, order: 5, label: 'Colonia El Carmen'},
    {latitude: 20.4590, longitude: -97.0800, order: 6, label: 'Base Operativa'},
  ];

  // Puntos visitados (simulación: los primeros 2 completados)
  const visitedCount = 2;
  const nextPendingPoint = points[visitedCount] || points[points.length - 1];

  return (
    <View style={styles.container}>
      {/* 1. MAPA COMPLETO DE FONDO (FULLSCREEN BACKGROUND) */}
      <View style={StyleSheet.absoluteFill}>
        <MapView
          latitude={20.4536}
          longitude={-97.0876}
          truckLatitude={20.4520}
          truckLongitude={-97.0890}
          truckName="Mi Camión (ECO-TRUCK-001)"
          routePoints={points}
        />
      </View>

      {/* 2. ISLA FLOTANTE SUPERIOR: HEADER RUTA Y ESTADO DE TURNO */}
      <View style={[styles.floatingHeaderCard, {backgroundColor: colors.surface, borderColor: colors.border}]}>
        <View style={styles.headerTitleRow}>
          <View style={styles.btnRow}>
            <Icon name="truck" size={18} color={colors.primaryDark} />
            <Text style={[styles.routeName, {color: colors.primaryDark}]}>
              {route ? route.name : 'Ruta Centro - Mañana'}
            </Text>
          </View>
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
              ● {shiftStatus === 'active' ? 'ACTIVO' : 'PAUSADO'}
            </Text>
          </View>
        </View>
        <Text style={[styles.routeMeta, {color: colors.textSecondary}]}>
          Zona: {route ? route.zone : 'Zona Centro'} • {visitedCount} de {points.length} puntos completados
        </Text>
      </View>

      {/* 3. ISLA FLOTANTE: SIGUIENTE PUNTO PENDIENTE */}
      <View style={styles.floatingPointContainer}>
        <TouchableOpacity
          style={[styles.nextPointCard, {backgroundColor: colors.surface, borderColor: colors.border}]}
          onPress={() => setShowAllPointsModal(true)}
          activeOpacity={0.8}>
          <View style={styles.nextPointHeader}>
            <View style={styles.btnRow}>
              <Icon name="map-pin" size={16} color={colors.primary} />
              <Text style={[styles.nextPointBadgeText, {color: colors.primary}]}>
                SIGUIENTE PUNTO PENDIENTE
              </Text>
            </View>
            <View style={styles.expandBadge}>
              <Text style={[styles.expandText, {color: colors.textSecondary}]}>
                Ver todos ({points.length})
              </Text>
              <Icon name="chevron-right" size={14} color={colors.textSecondary} />
            </View>
          </View>

          <View style={styles.nextPointContent}>
            <View style={[styles.pointDot, {backgroundColor: colors.warning}]}>
              <Text style={styles.pointNum}>{nextPendingPoint.order}</Text>
            </View>
            <View style={styles.pointInfo}>
              <Text style={[styles.pointLabel, {color: colors.text}]}>
                {nextPendingPoint.label || `Punto ${nextPendingPoint.order}`}
              </Text>
              <Text style={[styles.pointCoords, {color: colors.textSecondary}]}>
                {nextPendingPoint.latitude.toFixed(4)}, {nextPendingPoint.longitude.toFixed(4)}
              </Text>
            </View>
            <View style={[styles.pendingTag, {backgroundColor: colors.warning + '20'}]}>
              <Text style={[styles.pendingTagText, {color: colors.warning}]}>Pendiente</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* 4. CONTROLES FLOTANTES INFERIORES */}
      <View style={styles.bottomFloatingContainer}>
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
                size={18}
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
              <Icon name="alert" size={18} color="#FFFFFF" />
              <Text style={styles.actionText}>Reportar Percance</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* MODAL DESPLEGABLE: TODOS LOS PUNTOS DE RECOLECCIÓN */}
      <Modal
        visible={showAllPointsModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAllPointsModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, {backgroundColor: colors.surface}]}>
            <View style={styles.modalHeader}>
              <View style={styles.btnRow}>
                <Icon name="map-pin" size={20} color={colors.primaryDark} />
                <Text style={[styles.modalTitle, {color: colors.primaryDark}]}>
                  Puntos de Recolección ({points.length})
                </Text>
              </View>
              <TouchableOpacity
                style={[styles.closeBtn, {backgroundColor: colors.border + '40'}]}
                onPress={() => setShowAllPointsModal(false)}>
                <Icon name="x" size={18} color={colors.text} />
              </TouchableOpacity>
            </View>

            <Text style={[styles.modalSubtitle, {color: colors.textSecondary}]}>
              Recorrido asignado en {route ? route.zone : 'Zona Centro'}
            </Text>

            <ScrollView style={styles.pointsList} showsVerticalScrollIndicator={false}>
              {loading ? (
                <ActivityIndicator size="small" color={colors.primary} />
              ) : (
                points.map((pt, idx) => {
                  const isVisited = idx < visitedCount;
                  const isNext = idx === visitedCount;
                  return (
                    <View
                      key={pt.order}
                      style={[
                        styles.modalPointRow,
                        isNext && styles.nextPointHighlight,
                      ]}>
                      <View
                        style={[
                          styles.pointDot,
                          {
                            backgroundColor: isVisited
                              ? colors.primary
                              : isNext
                              ? colors.warning
                              : colors.border,
                          },
                        ]}>
                        <Text style={styles.pointNum}>{pt.order}</Text>
                      </View>

                      <View style={styles.pointInfo}>
                        <Text
                          style={[
                            styles.pointLabel,
                            isNext ? styles.pointLabelBold : styles.pointLabelNormal,
                            {color: colors.text},
                          ]}>
                          {pt.label || `Punto ${pt.order}`}
                        </Text>
                        <Text style={[styles.pointCoords, {color: colors.textSecondary}]}>
                          {pt.latitude.toFixed(4)}, {pt.longitude.toFixed(4)}
                        </Text>
                      </View>

                      <View
                        style={[
                          styles.statusBadgeModal,
                          {
                            backgroundColor: isVisited
                              ? colors.success + '20'
                              : isNext
                              ? colors.warning + '20'
                              : colors.border + '30',
                          },
                        ]}>
                        <Text
                          style={[
                            styles.statusBadgeModalText,
                            {
                              color: isVisited
                                ? colors.success
                                : isNext
                                ? colors.warning
                                : colors.textSecondary,
                            },
                          ]}>
                          {isVisited ? '✓ Visitado' : isNext ? 'Siguiente' : 'Pendiente'}
                        </Text>
                      </View>
                    </View>
                  );
                })
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  btnRow: {flexDirection: 'row', alignItems: 'center', gap: 6},
  floatingHeaderCard: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
    right: Spacing.md,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    zIndex: 10,
  },
  headerTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  routeName: {
    fontSize: Typography.sizes.md,
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
  floatingPointContainer: {
    position: 'absolute',
    top: 90,
    left: Spacing.md,
    right: Spacing.md,
    zIndex: 10,
  },
  nextPointCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  nextPointHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  nextPointBadgeText: {
    fontSize: Typography.sizes.xs,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  expandBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  expandText: {
    fontSize: Typography.sizes.xs,
    fontWeight: '600',
  },
  nextPointContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 4,
  },
  pointDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  pointNum: {color: '#FFFFFF', fontSize: Typography.sizes.xs, fontWeight: 'bold'},
  pointInfo: {flex: 1},
  pointLabel: {fontSize: Typography.sizes.sm, fontWeight: '600'},
  pointCoords: {fontSize: Typography.sizes.xs},
  pendingTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  pendingTagText: {
    fontSize: Typography.sizes.xs,
    fontWeight: 'bold',
  },
  bottomFloatingContainer: {
    position: 'absolute',
    bottom: Spacing.md,
    left: Spacing.md,
    right: Spacing.md,
    zIndex: 10,
  },
  controlsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  actionButton: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  actionText: {color: '#FFFFFF', fontSize: Typography.sizes.xs, fontWeight: 'bold'},
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: Spacing.md,
    maxHeight: '75%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  modalTitle: {
    fontSize: Typography.sizes.md,
    fontWeight: 'bold',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalSubtitle: {
    fontSize: Typography.sizes.xs,
    marginBottom: Spacing.md,
  },
  pointsList: {
    maxHeight: 400,
  },
  modalPointRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xs,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#CCCCCC33',
  },
  nextPointHighlight: {
    backgroundColor: '#2E7D3215',
    borderRadius: 12,
  },
  pointLabelBold: {
    fontWeight: 'bold',
  },
  pointLabelNormal: {
    fontWeight: '600',
  },
  statusBadgeModal: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusBadgeModalText: {
    fontSize: Typography.sizes.xs,
    fontWeight: 'bold',
  },
});

export default DriverHomeScreen;

