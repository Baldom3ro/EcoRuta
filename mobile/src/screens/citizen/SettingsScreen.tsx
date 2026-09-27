// Pantalla de Configuración ciudadano
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from 'react-native';
import {useTheme} from '../../context/ThemeContext';
import {useAuth} from '../../context/AuthContext';
import {Icon, IconName} from '../../components/Icon';
import {Typography, Spacing, BorderRadius} from '../../theme';

const SettingsScreen: React.FC = () => {
  const {colors, mode, toggleTheme} = useTheme();
  const {user, logout} = useAuth();

  const settingsItems: {icon: IconName; label: string; subtitle: string}[] = [
    {
      icon: 'user',
      label: user?.name || 'Usuario',
      subtitle: user?.email || '',
    },
    {
      icon: 'map-pin',
      label: 'Mi zona',
      subtitle: user?.zone || 'Sin zona',
    },
  ];

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      {settingsItems.map((item, i) => (
        <View
          key={i}
          style={[styles.row, {backgroundColor: colors.surface, borderColor: colors.border}]}>
          <View style={styles.iconWrapper}>
            <Icon name={item.icon} size={22} color={colors.primary} />
          </View>
          <View style={styles.textBlock}>
            <Text style={[styles.label, {color: colors.text}]}>{item.label}</Text>
            {item.subtitle ? (
              <Text style={[styles.subtitle, {color: colors.textSecondary}]}>
                {item.subtitle}
              </Text>
            ) : null}
          </View>
        </View>
      ))}

      <View
        style={[styles.row, {backgroundColor: colors.surface, borderColor: colors.border}]}>
        <View style={styles.iconWrapper}>
          <Icon name="moon" size={22} color={colors.primary} />
        </View>
        <Text style={[styles.label, {color: colors.text}]}>
          Modo oscuro
        </Text>
        <Switch
          value={mode === 'dark'}
          onValueChange={toggleTheme}
          trackColor={{true: colors.primary, false: colors.border}}
          thumbColor="#FFF"
        />
      </View>

      <TouchableOpacity
        style={[styles.logoutButton, {backgroundColor: colors.error}]}
        onPress={logout}>
        <View style={styles.logoutRow}>
          <Icon name="log-out" size={20} color="#FFFFFF" />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: Spacing.md, gap: Spacing.sm},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
  },
  iconWrapper: {marginRight: Spacing.md, width: 28, alignItems: 'center'},
  textBlock: {flex: 1},
  label: {fontSize: Typography.sizes.md, fontWeight: '500', flex: 1},
  subtitle: {fontSize: Typography.sizes.sm, marginTop: 2},
  logoutButton: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  logoutRow: {flexDirection: 'row', alignItems: 'center', gap: Spacing.xs},
  logoutText: {color: '#FFF', fontSize: Typography.sizes.md, fontWeight: '600'},
});

export default SettingsScreen;
