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
import {Typography, Spacing, BorderRadius} from '../../theme';

const SettingsScreen: React.FC = () => {
  const {colors, mode, toggleTheme} = useTheme();
  const {user, logout} = useAuth();

  const settingsItems = [
    {
      icon: '👤',
      label: user?.name || 'Usuario',
      subtitle: user?.email || '',
      action: undefined,
    },
    {
      icon: '📍',
      label: 'Mi zona',
      subtitle: user?.zone || 'Sin zona',
      action: undefined,
    },
  ];

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      {settingsItems.map((item, i) => (
        <View
          key={i}
          style={[styles.row, {backgroundColor: colors.surface, borderColor: colors.border}]}>
          <Text style={styles.icon}>{item.icon}</Text>
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
        <Text style={styles.icon}>{mode === 'dark' ? '🌙' : '☀️'}</Text>
        <Text style={[styles.label, {color: colors.text, flex: 1}]}>
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
        <Text style={styles.logoutText}>Cerrar sesión</Text>
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
  icon: {fontSize: 24, marginRight: Spacing.md},
  textBlock: {flex: 1},
  label: {fontSize: Typography.sizes.md, fontWeight: '500'},
  subtitle: {fontSize: Typography.sizes.sm, marginTop: 2},
  logoutButton: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  logoutText: {color: '#FFF', fontSize: Typography.sizes.md, fontWeight: '600'},
});

export default SettingsScreen;
