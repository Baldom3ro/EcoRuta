// Pantalla Mis Reportes (Ciudadano)
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
import {ReportService} from '../../services';
import {Report} from '../../services/types';
import {Icon} from '../../components/Icon';
import {Typography, Spacing, BorderRadius} from '../../theme';

const reportTypeLabels: Record<string, string> = {
  missed_pickup: 'No pasó el camión de basura',
  overflowing: 'Contenedor desbordado',
  blocked_access: 'Acceso a calle bloqueado',
  other: 'Otra incidencia',
};

const statusLabels: Record<string, {label: string; color: string}> = {
  pending: {label: 'Pendiente', color: '#F39C12'},
  in_review: {label: 'En revisión', color: '#3498DB'},
  resolved: {label: 'Resuelto', color: '#2ECC71'},
};

const MyReportsScreen: React.FC = () => {
  const {colors} = useTheme();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const loadReports = useCallback(async () => {
    setLoading(true);
    try {
      const data = await ReportService.getMyReports('citizen-001');
      setReports(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadReports();
    }, [loadReports]),
  );

  const renderItem = ({item}: {item: Report}) => {
    const status = statusLabels[item.status] || statusLabels.pending;

    return (
      <TouchableOpacity
        style={[styles.card, {backgroundColor: colors.surface, borderColor: colors.border}]}
        onPress={() => setSelectedReport(item)}
        activeOpacity={0.8}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Icon
              name={item.type === 'missed_pickup' ? 'truck' : 'file-text'}
              size={18}
              color={colors.primary}
            />
            <Text style={[styles.type, {color: colors.text}]} numberOfLines={1}>
              {reportTypeLabels[item.type] || item.description}
            </Text>
          </View>
          <View style={[styles.badge, {backgroundColor: status.color + '20'}]}>
            <Text style={[styles.badgeText, {color: status.color}]}>{status.label}</Text>
          </View>
        </View>

        <Text style={[styles.descSnippet, {color: colors.textSecondary}]} numberOfLines={2}>
          {item.description}
        </Text>

        {item.address && (
          <View style={styles.infoRow}>
            <Icon name="map-pin" size={14} color={colors.textSecondary} />
            <Text style={[styles.address, {color: colors.textSecondary}]}>
              {item.address}
            </Text>
          </View>
        )}

        <View style={styles.cardFooter}>
          <View style={styles.infoRow}>
            <Icon name="calendar" size={14} color={colors.textSecondary} />
            <Text style={[styles.date, {color: colors.textSecondary}]}>
              {new Date(item.createdAt).toLocaleDateString('es-MX')}
            </Text>
          </View>
          <View style={styles.btnRow}>
            <Text style={[styles.detailLink, {color: colors.primary}]}>Ver detalle</Text>
            <Icon name="chevron-right" size={14} color={colors.primary} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={reports}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={[styles.empty, {color: colors.textSecondary}]}>
              No tienes reportes aún
            </Text>
          }
        />
      )}

      {/* MODAL DETALLE DE REPORTE (CIUDADANO) */}
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
                      Detalle de mi Reporte
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
                          (statusLabels[selectedReport.status]?.color || '#F39C12') + '20',
                      },
                    ]}>
                    <Text
                      style={[
                        styles.statusBadgeModalText,
                        {
                          color:
                            statusLabels[selectedReport.status]?.color || '#F39C12',
                        },
                      ]}>
                      {statusLabels[selectedReport.status]?.label || selectedReport.status}
                    </Text>
                  </View>
                  <Text style={[styles.detailDate, {color: colors.textSecondary}]}>
                    {new Date(selectedReport.createdAt).toLocaleString('es-MX')}
                  </Text>
                </View>

                {/* Tipo de reporte */}
                <View style={[styles.detailSection, {borderColor: colors.border}]}>
                  <Text style={[styles.detailLabel, {color: colors.textSecondary}]}>
                    Tipo de problema
                  </Text>
                  <Text style={[styles.detailValue, {color: colors.text}]}>
                    {reportTypeLabels[selectedReport.type] || selectedReport.type}
                  </Text>
                </View>

                {/* Ubicación */}
                <View style={[styles.detailSection, {borderColor: colors.border}]}>
                  <Text style={[styles.detailLabel, {color: colors.textSecondary}]}>
                    Ubicación registrada
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
                    Descripción del reporte
                  </Text>
                  <Text style={[styles.detailDescText, {color: colors.text}]}>
                    {selectedReport.description}
                  </Text>
                </View>

                {/* Foto adjunta */}
                {selectedReport.photoUrl && (
                  <View style={[styles.detailSection, {borderColor: colors.border}]}>
                    <Text style={[styles.detailLabel, {color: colors.textSecondary}]}>
                      Evidencia adjunta
                    </Text>
                    <Image
                      source={{uri: selectedReport.photoUrl}}
                      style={styles.modalPhoto}
                      resizeMode="cover"
                    />
                  </View>
                )}
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
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  btnRow: {flexDirection: 'row', alignItems: 'center', gap: 6},
  list: {padding: Spacing.md, gap: Spacing.sm},
  card: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  titleRow: {flex: 1, flexDirection: 'row', alignItems: 'center', gap: Spacing.xs, paddingRight: Spacing.sm},
  infoRow: {flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4},
  type: {fontSize: Typography.sizes.md, fontWeight: 'bold'},
  descSnippet: {fontSize: Typography.sizes.sm, marginVertical: 4},
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  badgeText: {fontSize: Typography.sizes.xs, fontWeight: '600'},
  address: {fontSize: Typography.sizes.sm},
  date: {fontSize: Typography.sizes.xs},
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
  empty: {textAlign: 'center', marginTop: Spacing.xxl, fontSize: Typography.sizes.md},
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
});

export default MyReportsScreen;

