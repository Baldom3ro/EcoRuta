// Pantalla de Notificaciones del ciudadano
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '../../context/ThemeContext';
import {NotificationService} from '../../services';
import {Notification} from '../../services/types';
import {Icon, IconName} from '../../components/Icon';
import {Typography, Spacing, BorderRadius} from '../../theme';

const notifIconNames: Record<string, IconName> = {
  proximity: 'map-pin',
  time_estimate: 'clock',
  route_suspended: 'warning',
  incident: 'alert',
  tip: 'lightbulb',
};

const NotificationsScreen: React.FC = () => {
  const {colors} = useTheme();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    setLoading(true);
    const data = await NotificationService.getNotifications('citizen-001');
    setNotifications(data);
    setLoading(false);
  };

  const handleMarkRead = async (id: string) => {
    await NotificationService.markAsRead(id);
    setNotifications(prev =>
      prev.map(n => (n.id === id ? {...n, read: true} : n)),
    );
  };

  const renderItem = ({item}: {item: Notification}) => (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: item.read ? colors.surface : colors.primaryLight,
          borderColor: colors.border,
        },
      ]}
      onPress={() => handleMarkRead(item.id)}>
      <View style={styles.iconContainer}>
        <Icon
          name={notifIconNames[item.type] || 'bell'}
          size={24}
          color={colors.primary}
        />
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, {color: colors.text}]}>{item.title}</Text>
        <Text style={[styles.message, {color: colors.textSecondary}]}>
          {item.message}
        </Text>
        <Text style={[styles.time, {color: colors.textSecondary}]}>
          {new Date(item.createdAt).toLocaleTimeString('es-MX', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
      {!item.read && (
        <View style={[styles.dot, {backgroundColor: colors.primary}]} />
      )}
    </TouchableOpacity>
  );

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
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={[styles.empty, {color: colors.textSecondary}]}>
            Sin notificaciones
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
  },
  iconContainer: {marginRight: Spacing.md, width: 32, alignItems: 'center'},
  content: {flex: 1},
  title: {fontSize: Typography.sizes.md, fontWeight: '600'},
  message: {fontSize: Typography.sizes.sm, marginTop: 2},
  time: {fontSize: Typography.sizes.xs, marginTop: Spacing.xs},
  dot: {width: 10, height: 10, borderRadius: 5},
  empty: {textAlign: 'center', marginTop: Spacing.xxl, fontSize: Typography.sizes.md},
});

export default NotificationsScreen;
