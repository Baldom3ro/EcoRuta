// Home Conductor - Mapa a Pantalla Completa con Islas Flotantes y Desplegable Inline en Fondo (GIS Style)
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
import {Typography, Spacing, BorderRadius} from '../../theme';

const DriverHomeScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const {colors} = useTheme();
  const [route, setRoute] = useState<Route | null>(null);
  const [loading, setLoading] = useState(true);
  const [shiftStatus, setShiftStatus] = useState<'pending' | 'active' | 'completed'>('active');
  const [isExpanded, setIsExpanded] = useState(false);

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

      {/* 2. OVERLAY DESPUNTADOR AL TOCAR FUERA PARA COLAPSAR LA LISTA */}
      {isExpanded && (
        <TouchableOpacity
          style={styles.backdropOverlay}
          activeOpacity={1}
          onPress={() => setIsExpanded(false)}
        />
      )}

      {/* 3. ISLA FLOTANTE SUPERIOR: HEADER RUTA Y ESTADO DE TURNO */}
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

      {/* 3. ISLA FLOTANTE INFERIOR: TARJETA DE PUNTOS Y BOTONES DE ACCIÓN */}
      <View style={styles.bottomFloatingContainer}>
        {/* TARJETA DESPLEGABLE INLINE SOBRE LOS BOTONES */}
        <View
          style={[
            styles.floatingPointsCard,
            {backgroundColor: colors.surface, borderColor: colors.border},
          ]}>
          {/* ENCABEZADO TOQUABLE PARA DESPLEGAR / COLAPSAR */}
          <TouchableOpacity
            style={styles.pointsHeaderRow}
            onPress={() => setIsExpanded(prev => !prev)}
            activeOpacity={0.7}>
            <View style={styles.btnRow}>
              <Icon name="map-pin" size={16} color={colors.primary} />
              <Text style={[styles.pointsBadgeText, {color: colors.primary}]}>
                {isExpanded
                  ? `PUNTOS DE RECOLECCIÓN (${points.length})`
                  : 'SIGUIENTE PUNTO PENDIENTE'}
              </Text>
            </View>

            <View style={styles.expandBadge}>
              <Text style={[styles.expandText, {color: colors.textSecondary}]}>
                {isExpanded ? 'Ocultar' : `Ver todos (${points.length})`}
              </Text>
              <Icon
                name={isExpanded ? 'chevron-down' : 'chevron-up'}
                size={14}
                color={colors.textSecondary}
              />
            </View>
          </TouchableOpacity>

          {/* CONTENIDO: SOLO EL SIGUIENTE O LA LISTA COMPLETA */}
          {!isExpanded ? (
            <TouchableOpacity
              style={styles.nextPointContent}
              onPress={() => setIsExpanded(true)}
              activeOpacity={0.8}>
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
            </TouchableOpacity>
          ) : (
            <ScrollView style={styles.expandedPointsList} showsVerticalScrollIndicator={false}>
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
                        styles.pointRowInline,
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
                          styles.statusBadgeInline,
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
                            styles.statusBadgeInlineText,
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
          )}
        </View>

        {/* BOTONES DE ACCIÓN (PAUSAR & REPORTAR PERCANCE) */}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  backdropOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    zIndex: 5,
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
  bottomFloatingContainer: {
    position: 'absolute',
    bottom: Spacing.md,
    left: Spacing.md,
    right: Spacing.md,
    gap: Spacing.sm,
    zIndex: 10,
  },
  floatingPointsCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  pointsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointsBadgeText: {
    fontSize: Typography.sizes.xs,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  expandBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  expandText: {
    fontSize: Typography.sizes.xs,
    fontWeight: '600',
  },
  nextPointContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Spacing.xs,
    marginTop: Spacing.xs,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#CCCCCC33',
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
  pointLabel: {fontSize: Typography.sizes.sm},
  pointLabelBold: {fontWeight: 'bold'},
  pointLabelNormal: {fontWeight: '600'},
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
  expandedPointsList: {
    maxHeight: 240,
    marginTop: Spacing.xs,
    paddingTop: Spacing.xs,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#CCCCCC33',
  },
  pointRowInline: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.xs,
    paddingHorizontal: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#CCCCCC22',
  },
  nextPointHighlight: {
    backgroundColor: '#2E7D3215',
    borderRadius: 8,
  },
  statusBadgeInline: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusBadgeInlineText: {
    fontSize: Typography.sizes.xs,
    fontWeight: 'bold',
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
});

export default DriverHomeScreen;


