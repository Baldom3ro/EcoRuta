// Pantalla de Alertas e Incidencias de Zona para Conductor (HU-D02, HU-D03)
import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useTheme} from '../../context/ThemeContext';
import {ReportService, TruckService} from '../../services';
import {Report, Incident} from '../../services/types';
import {Icon} from '../../components/Icon';
import {Typography, Spacing, BorderRadius} from '../../theme';

const reportTypeLabels: Record<string, string> = {
  missed_pickup: 'No pasó el camión de basura',
  overflowing: 'Contenedor desbordado',
  blocked_access: 'Acceso a calle bloqueado',
  other: 'Otra incidencia',
};

const statusConfig: Record<string, {label: string; color: string}> = {
  pending: {label: 'PENDIENTE', color: '#F39C12'},
  in_review: {label: 'EN REVISIÓN', color: '#3498DB'},
  resolved: {label: 'RESUELTO', color: '#2ECC71'},
};

const AlertsScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const {colors} = useTheme();
  const [activeTab, setActiveTab] = useState<'citizen' | 'driver'>('citizen');
  const [citizenReports, setCitizenReports] = useState<Report[]>([]);
  const [driverIncidents, setDriverIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const reports = await ReportService.getReportsByZone('Zona Centro');
      const incidents = await TruckService.getDriverAlerts('driver-001');
      setCitizenReports(reports);
      setDriverIncidents(incidents);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData]),
  );

  const handleUpdateStatus = async (newStatus: 'pending' | 'in_review' | 'resolved') => {
    if (!selectedReport) return;
    setUpdatingStatus(true);
    try {
      const updated = await ReportService.updateReportStatus(selectedReport.id, newStatus);
      if (updated) {
        setSelectedReport(updated);
        await loadData();
      }
    } finally {
      setUpdatingStatus(false);
    }
  };

  const renderCitizenReport = ({item}: {item: Report}) => {
    const statusInfo = statusConfig[item.status] || statusConfig.pending;
    return (
      <TouchableOpacity
        style={[
          styles.card,
          {backgroundColor: colors.surface, borderColor: colors.border},
        ]}
        onPress={() => setSelectedReport(item)}
        activeOpacity={0.8}>
        <View style={styles.cardHeader}>
          <View style={styles.titleRow}>
            <Icon name="map-pin" size={16} color={colors.primary} />
            <Text style={[styles.cardTitle, {color: colors.text}]} numberOfLines={1}>
              {item.address || 'Ubicación reportada'}
            </Text>
          </View>
          <View style={[styles.badge, {backgroundColor: statusInfo.color + '20'}]}>
            <Text style={[styles.badgeText, {color: statusInfo.color}]}>
              {statusInfo.label}
            </Text>
          </View>
        </View>
        <Text style={[styles.cardUser, {color: colors.textSecondary}]}>
          Reportado por: {item.userName} • {reportTypeLabels[item.type] || item.type}
        </Text>
        <Text style={[styles.cardDesc, {color: colors.text}]} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.cardFooter}>
          <Text style={[styles.cardTime, {color: colors.textSecondary}]}>
            {new Date(item.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
          <View style={styles.btnRow}>
            <Text style={[styles.detailLink, {color: colors.primary}]}>Ver detalle</Text>
            <Icon name="chevron-right" size={14} color={colors.primary} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderDriverIncident = ({item}: {item: Incident}) => (
    <View
      style={[
        styles.card,
        {backgroundColor: colors.surface, borderColor: colors.border},
      ]}>
      <View style={styles.cardHeader}>
        <View style={styles.titleRow}>
          <Icon name="alert" size={16} color={colors.error} />
          <Text style={[styles.cardTitle, {color: colors.error}]}>
            {item.type.replace('_', ' ').toUpperCase()}
          </Text>
        </View>
        <View style={[styles.badge, {backgroundColor: colors.error + '20'}]}>
          <Text style={[styles.badgeText, {color: colors.error}]}>
            INCIDENTE
          </Text>
        </View>
      </View>
      <Text style={[styles.cardDesc, {color: colors.text}]}>
        {item.description}
      </Text>
      <View style={styles.incidentFlags}>
        {item.notifiedSupervisor && (
          <Text style={[styles.flag, {color: colors.primary}]}>
            ✓ Supervisor Notificado
          </Text>
        )}
        {item.alertSentToUsers && (
          <Text style={[styles.flag, {color: colors.warning}]}>
            ✓ Alerta Masiva Enviada
          </Text>
        )}
      </View>
    </View>
  );

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      {/* Botón flotante/superior para reportar percance */}
      <TouchableOpacity
        style={[styles.reportBtn, {backgroundColor: colors.error}]}
        onPress={() => navigation.navigate('ReportIncident')}>
        <View style={styles.btnRow}>
          <Icon name="alert" size={18} color="#FFFFFF" />
          <Text style={styles.reportBtnText}>Reportar Percance / Suspender Ruta</Text>
        </View>
      </TouchableOpacity>

      {/* Tabs */}
      <View style={[styles.tabBar, {borderColor: colors.border}]}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'citizen' && [
              styles.activeTabBorder,
              {borderBottomColor: colors.primary},
            ],
          ]}
          onPress={() => setActiveTab('citizen')}>
          <Text
            style={[
              styles.tabText,
              {
                color:
                  activeTab === 'citizen' ? colors.primary : colors.textSecondary,
              },
            ]}>
            Reportes Ciudadanos ({citizenReports.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'driver' && [
              styles.activeTabBorder,
              {borderBottomColor: colors.primary},
            ],
          ]}
          onPress={() => setActiveTab('driver')}>
          <Text
            style={[
              styles.tabText,
              {
                color:
                  activeTab === 'driver' ? colors.primary : colors.textSecondary,
              },
            ]}>
            Alertas Internas ({driverIncidents.length})
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={styles.loaderMargin}
        />
      ) : activeTab === 'citizen' ? (
        <FlatList
          data={citizenReports}
          renderItem={renderCitizenReport}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={[styles.emptyText, {color: colors.textSecondary}]}>
              No hay reportes de ciudadanos en tu zona.
            </Text>
          }
        />
      ) : (
        <FlatList
          data={driverIncidents}
          renderItem={renderDriverIncident}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={[styles.emptyText, {color: colors.textSecondary}]}>
              No hay percances reportados hoy.
            </Text>
          }
        />
      )}

      {/* MODAL DETALLE DEL REPORTE */}
      <Modal
        visible={selectedReport !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedReport(null)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, {backgroundColor: colors.surface}]}>
            {selectedReport && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.modalHeader}>
                  <View style={styles.btnRow}>
                    <Icon name="file-text" size={20} color={colors.primary} />
                    <Text style={[styles.modalTitle, {color: colors.primaryDark}]}>
                      Detalle del Reporte
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.closeBtn, {backgroundColor: colors.border + '40'}]}
                    onPress={() => setSelectedReport(null)}>
                    <Icon name="x" size={18} color={colors.text} />
                  </TouchableOpacity>
                </View>

                {/* Status Badge */}
                <View style={styles.detailHeaderRow}>
                  <View
                    style={[
                      styles.statusBadgeModal,
                      {
                        backgroundColor:
                          (statusConfig[selectedReport.status]?.color || '#F39C12') + '20',
                      },
                    ]}>
                    <Text
                      style={[
                        styles.statusBadgeModalText,
                        {
                          color:
                            statusConfig[selectedReport.status]?.color || '#F39C12',
                        },
                      ]}>
                      {statusConfig[selectedReport.status]?.label || selectedReport.status}
                    </Text>
                  </View>
                  <Text style={[styles.detailDate, {color: colors.textSecondary}]}>
                    {new Date(selectedReport.createdAt).toLocaleString('es-MX')}
                  </Text>
                </View>

                {/* Tipo de reporte */}
                <View style={[styles.detailSection, {borderColor: colors.border}]}>
                  <Text style={[styles.detailLabel, {color: colors.textSecondary}]}>
                    Tipo de incidencia
                  </Text>
                  <Text style={[styles.detailValue, {color: colors.text}]}>
                    {reportTypeLabels[selectedReport.type] || selectedReport.type}
                  </Text>
                </View>

                {/* Ciudadano que reportó */}
                <View style={[styles.detailSection, {borderColor: colors.border}]}>
                  <Text style={[styles.detailLabel, {color: colors.textSecondary}]}>
                    Reportado por
                  </Text>
                  <Text style={[styles.detailValue, {color: colors.text}]}>
                    {selectedReport.userName}
                  </Text>
                </View>

                {/* Ubicación */}
                <View style={[styles.detailSection, {borderColor: colors.border}]}>
                  <Text style={[styles.detailLabel, {color: colors.textSecondary}]}>
                    Ubicación del problema
                  </Text>
                  <Text style={[styles.detailValue, {color: colors.text}]}>
                    {selectedReport.address || 'Gutiérrez Zamora, Veracruz'}
                  </Text>
                  <Text style={[styles.coordsText, {color: colors.primary}]}>
                    GPS: {selectedReport.latitude.toFixed(4)}, {selectedReport.longitude.toFixed(4)}
                  </Text>
                </View>

                {/* Descripción completa */}
                <View style={[styles.detailSection, {borderColor: colors.border}]}>
                  <Text style={[styles.detailLabel, {color: colors.textSecondary}]}>
                    Descripción detallada
                  </Text>
                  <Text style={[styles.detailDescText, {color: colors.text}]}>
                    {selectedReport.description}
                  </Text>
                </View>

                {/* Foto adjunta */}
                {selectedReport.photoUrl && (
                  <View style={[styles.detailSection, {borderColor: colors.border}]}>
                    <Text style={[styles.detailLabel, {color: colors.textSecondary}]}>
                      Evidencia fotográfica
                    </Text>
                    <Image
                      source={{uri: selectedReport.photoUrl}}
                      style={styles.modalPhoto}
                      resizeMode="cover"
                    />
                  </View>
                )}

                {/* Botones de actualización de estado para el conductor */}
                <View style={styles.actionSection}>
                  <Text style={[styles.detailLabel, {color: colors.textSecondary}]}>
                    Cambiar estado de atención
                  </Text>

                  {updatingStatus ? (
                    <ActivityIndicator size="small" color={colors.primary} />
                  ) : (
                    <View style={styles.statusActionRow}>
                      <TouchableOpacity
                        style={[
                          styles.statusActionBtn,
                          {backgroundColor: colors.warning},
                          selectedReport.status === 'in_review' && styles.statusBtnDisabled,
                        ]}
                        onPress={() => handleUpdateStatus('in_review')}>
                        <Text style={styles.statusActionText}>En Revisión</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.statusActionBtn,
                          {backgroundColor: colors.success},
                          selectedReport.status === 'resolved' && styles.statusBtnDisabled,
                        ]}
                        onPress={() => handleUpdateStatus('resolved')}>
                        <Text style={styles.statusActionText}>Resolver</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  loaderMargin: {marginTop: Spacing.xl},
  btnRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6},
  titleRow: {flex: 1, flexDirection: 'row', alignItems: 'center', gap: 6},
  reportBtn: {
    margin: Spacing.md,
    padding: Spacing.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  reportBtnText: {
    color: '#FFFFFF',
    fontSize: Typography.sizes.md,
    fontWeight: 'bold',
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  activeTabBorder: {
    borderBottomWidth: 3,
  },
  tabText: {
    fontSize: Typography.sizes.sm,
    fontWeight: 'bold',
  },
  list: {
    padding: Spacing.md,
  },
  card: {
    padding: Spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  cardTitle: {
    fontSize: Typography.sizes.md,
    fontWeight: 'bold',
    flex: 1,
  },
  cardUser: {
    fontSize: Typography.sizes.xs,
    marginBottom: Spacing.xs,
  },
  cardDesc: {
    fontSize: Typography.sizes.sm,
    marginBottom: Spacing.xs,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.xs,
    paddingTop: Spacing.xs,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#CCCCCC33',
  },
  detailLink: {
    fontSize: Typography.sizes.xs,
    fontWeight: 'bold',
  },
  cardTime: {
    fontSize: Typography.sizes.xs,
  },
  badge: {
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: Typography.sizes.xs,
    fontWeight: 'bold',
  },
  incidentFlags: {
    marginTop: Spacing.xs,
    gap: 2,
  },
  flag: {
    fontSize: Typography.sizes.xs,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: Spacing.xl,
    fontSize: Typography.sizes.md,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: Spacing.md,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  modalTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: 'bold',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  statusBadgeModal: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusBadgeModalText: {
    fontSize: Typography.sizes.xs,
    fontWeight: 'bold',
  },
  detailDate: {
    fontSize: Typography.sizes.xs,
  },
  detailSection: {
    paddingVertical: Spacing.xs,
    marginBottom: Spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  detailLabel: {
    fontSize: Typography.sizes.xs,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: Typography.sizes.sm,
    fontWeight: '600',
  },
  coordsText: {
    fontSize: Typography.sizes.xs,
    fontWeight: 'bold',
    marginTop: 2,
  },
  detailDescText: {
    fontSize: Typography.sizes.sm,
    lineHeight: 20,
  },
  modalPhoto: {
    width: '100%',
    height: 180,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.xs,
  },
  actionSection: {
    marginTop: Spacing.md,
  },
  statusActionRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  statusActionBtn: {
    flex: 1,
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  statusBtnDisabled: {
    opacity: 0.4,
  },
  statusActionText: {
    color: '#FFFFFF',
    fontSize: Typography.sizes.xs,
    fontWeight: 'bold',
  },
});

export default AlertsScreen;

