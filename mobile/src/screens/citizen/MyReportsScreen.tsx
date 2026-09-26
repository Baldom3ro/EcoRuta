// Pantalla Mis Reportes
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useTheme} from '../../context/ThemeContext';
import {ReportService} from '../../services';
import {Report} from '../../services/types';
import {Typography, Spacing, BorderRadius} from '../../theme';

const statusLabels: Record<string, {label: string; color: string}> = {
  pending: {label: 'Pendiente', color: '#F39C12'},
  in_review: {label: 'En revisión', color: '#3498DB'},
  resolved: {label: 'Resuelto', color: '#2ECC71'},
};

const MyReportsScreen: React.FC = () => {
  const {colors} = useTheme();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    setLoading(true);
    const data = await ReportService.getMyReports('citizen-001');
    setReports(data);
    setLoading(false);
  };

  const renderItem = ({item}: {item: Report}) => {
    const status = statusLabels[item.status] || statusLabels.pending;

    return (
      <View style={[styles.card, {backgroundColor: colors.surface, borderColor: colors.border}]}>
        <View style={styles.header}>
          <Text style={[styles.type, {color: colors.text}]}>
            {item.type === 'missed_pickup' ? '🚛' : '📋'} {item.description}
          </Text>
          <View style={[styles.badge, {backgroundColor: status.color}]}>
            <Text style={styles.badgeText}>{status.label}</Text>
          </View>
        </View>
        {item.address && (
          <Text style={[styles.address, {color: colors.textSecondary}]}>
            📍 {item.address}
          </Text>
        )}
        <Text style={[styles.date, {color: colors.textSecondary}]}>
          {new Date(item.createdAt).toLocaleDateString('es-MX')}
        </Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={[styles.center, {backgroundColor: colors.background}]}>
        <Text style={{color: colors.textSecondary}}>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  list: {padding: Spacing.md, gap: Spacing.sm},
  card: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  type: {flex: 1, fontSize: Typography.sizes.md, fontWeight: '500'},
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  badgeText: {color: '#FFF', fontSize: Typography.sizes.xs, fontWeight: '600'},
  address: {fontSize: Typography.sizes.sm, marginTop: Spacing.xs},
  date: {fontSize: Typography.sizes.xs, marginTop: Spacing.xs},
  empty: {textAlign: 'center', marginTop: Spacing.xxl, fontSize: Typography.sizes.md},
});

export default MyReportsScreen;
