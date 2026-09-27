// Pantalla de Alertas e Incidencias de Zona para Conductor (HU-D02, HU-D03)
import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import {useTheme} from '../../context/ThemeContext';
import {ReportService, TruckService} from '../../services';
import {Report, Incident} from '../../services/types';
import {Icon} from '../../components/Icon';
import {Typography, Spacing} from '../../theme';

const AlertsScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const {colors} = useTheme();
  const [activeTab, setActiveTab] = useState<'citizen' | 'driver'>('citizen');
  const [citizenReports, setCitizenReports] = useState<Report[]>([]);
  const [driverIncidents, setDriverIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    loadData();
  }, [loadData]);

  const renderCitizenReport = ({item}: {item: Report}) => (
    <View
      style={[
        styles.card,
        {backgroundColor: colors.surface, borderColor: colors.border},
      ]}>
      <View style={styles.cardHeader}>
        <View style={styles.titleRow}>
          <Icon name="map-pin" size={16} color={colors.primary} />
          <Text style={[styles.cardTitle, {color: colors.text}]}>
            {item.address || 'Ubicación reportada'}
          </Text>
        </View>
        <View style={[styles.badge, {backgroundColor: colors.warning + '20'}]}>
          <Text style={[styles.badgeText, {color: colors.warning}]}>
            {item.status.toUpperCase()}
          </Text>
        </View>
      </View>
      <Text style={[styles.cardUser, {color: colors.textSecondary}]}>
        Reportado por: {item.userName}
      </Text>
      <Text style={[styles.cardDesc, {color: colors.text}]}>
        {item.description}
      </Text>

      {item.photoUrl && (
        <Image source={{uri: item.photoUrl}} style={styles.reportPhoto} />
      )}

      <Text style={[styles.cardTime, {color: colors.textSecondary}]}>
        {new Date(item.createdAt).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Text>
    </View>
  );

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
          style={{marginTop: Spacing.xl}}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
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
  reportPhoto: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginVertical: Spacing.xs,
  },
  cardTime: {
    fontSize: Typography.sizes.xs,
    textAlign: 'right',
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
});

export default AlertsScreen;
