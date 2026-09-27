// Pantalla de Historial de Rutas para el Conductor
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useTheme} from '../../context/ThemeContext';
import {useAuth} from '../../context/AuthContext';
import {TruckService} from '../../services';
import {Icon} from '../../components/Icon';
import {Typography, Spacing} from '../../theme';

interface HistoryItem {
  id: string;
  routeName: string;
  date: string;
  durationMinutes: number;
  status: string;
  incidentsCount: number;
}

const HistoryScreen: React.FC = () => {
  const {colors} = useTheme();
  const {user} = useAuth();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const data = await TruckService.getDriverHistory(user?.id || 'driver-001');
        setHistory(data);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [user]);

  const renderItem = ({item}: {item: HistoryItem}) => {
    const isCompleted = item.status === 'completed';

    return (
      <View
        style={[
          styles.card,
          {backgroundColor: colors.surface, borderColor: colors.border},
        ]}>
        <View style={styles.cardHeader}>
          <Text style={[styles.routeName, {color: colors.text}]}>
            {item.routeName}
          </Text>
          <View
            style={[
              styles.badge,
              {
                backgroundColor: isCompleted
                  ? colors.success + '20'
                  : colors.error + '20',
              },
            ]}>
            <Text
              style={[
                styles.badgeText,
                {color: isCompleted ? colors.success : colors.error},
              ]}>
              {isCompleted ? 'COMPLETADA' : 'SUSPENDIDA'}
            </Text>
          </View>
        </View>

        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Icon name="calendar" size={14} color={colors.textSecondary} />
            <Text style={[styles.detailText, {color: colors.textSecondary}]}>
              {item.date}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="clock" size={14} color={colors.textSecondary} />
            <Text style={[styles.detailText, {color: colors.textSecondary}]}>
              {item.durationMinutes} min
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="alert" size={14} color={colors.textSecondary} />
            <Text style={[styles.detailText, {color: colors.textSecondary}]}>
              {item.incidentsCount} incidentes
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={{marginTop: Spacing.xl}}
        />
      ) : (
        <FlatList
          data={history}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={[styles.emptyText, {color: colors.textSecondary}]}>
              No hay rutas registradas en tu historial.
            </Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  list: {padding: Spacing.md},
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
  routeName: {
    fontSize: Typography.sizes.md,
    fontWeight: 'bold',
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
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.xs,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: Typography.sizes.xs,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: Spacing.xl,
    fontSize: Typography.sizes.md,
  },
});

export default HistoryScreen;
