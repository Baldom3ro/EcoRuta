// Pantalla de Configuración del Conductor
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import {useTheme} from '../../context/ThemeContext';
import {useAuth} from '../../context/AuthContext';
import {Icon} from '../../components/Icon';
import {Typography, Spacing} from '../../theme';

const DriverSettingsScreen: React.FC = () => {
  const {colors, mode, toggleTheme} = useTheme();
  const {user, logout} = useAuth();
  const [isShiftActive, setIsShiftActive] = useState(true);
  const isDarkMode = mode === 'dark';

  const handleLogout = () => {
    Alert.alert('Cerrar Sesión', '¿Deseas salir del sistema?', [
      {text: 'Cancelar', style: 'cancel'},
      {text: 'Cerrar Sesión', style: 'destructive', onPress: logout},
    ]);
  };

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: colors.background}]}
      contentContainerStyle={styles.content}>
      {/* Perfil */}
      <View style={[styles.profileCard, {backgroundColor: colors.surface, borderColor: colors.border}]}>
        <View style={[styles.avatar, {backgroundColor: colors.primary}]}>
          <Icon name="truck" size={30} color="#FFFFFF" />
        </View>
        <View style={styles.profileInfo}>
          <Text style={[styles.name, {color: colors.text}]}>
            {user?.name || 'Carlos Rodríguez'}
          </Text>
          <Text style={[styles.role, {color: colors.primary}]}>
            Operador de Recolección
          </Text>
          <Text style={[styles.email, {color: colors.textSecondary}]}>
            {user?.email || 'carlos.driver@ecoruta.gob.mx'}
          </Text>
        </View>
      </View>

      {/* Info de Unidad Asignada */}
      <View style={[styles.section, {backgroundColor: colors.surface, borderColor: colors.border}]}>
        <Text style={[styles.sectionTitle, {color: colors.text}]}>
          Unidad Asignada
        </Text>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, {color: colors.textSecondary}]}>Camión:</Text>
          <Text style={[styles.infoValue, {color: colors.text}]}>ECO-TRUCK-001</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, {color: colors.textSecondary}]}>Placa:</Text>
          <Text style={[styles.infoValue, {color: colors.text}]}>JAL-8842-X</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, {color: colors.textSecondary}]}>Zona Fija:</Text>
          <Text style={[styles.infoValue, {color: colors.text}]}>Zona Centro</Text>
        </View>
      </View>

      {/* Opciones */}
      <View style={[styles.section, {backgroundColor: colors.surface, borderColor: colors.border}]}>
        <Text style={[styles.sectionTitle, {color: colors.text}]}>
          Preferencias de Jornada
        </Text>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingTitle, {color: colors.text}]}>
              Turno Activo
            </Text>
            <Text style={[styles.settingSub, {color: colors.textSecondary}]}>
              Transmitiendo ubicación GPS en tiempo real
            </Text>
          </View>
          <Switch
            value={isShiftActive}
            onValueChange={setIsShiftActive}
            trackColor={{false: colors.border, true: colors.primary}}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingTitle, {color: colors.text}]}>
              Modo Oscuro
            </Text>
            <Text style={[styles.settingSub, {color: colors.textSecondary}]}>
              Ajusta el tema visual de la aplicación
            </Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            trackColor={{false: colors.border, true: colors.primary}}
          />
        </View>
      </View>

      {/* Botón Logout */}
      <TouchableOpacity
        style={[styles.logoutButton, {borderColor: colors.error}]}
        onPress={handleLogout}>
        <View style={styles.logoutRow}>
          <Icon name="log-out" size={20} color={colors.error} />
          <Text style={[styles.logoutText, {color: colors.error}]}>
            Cerrar Sesión de Conductor
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  content: {padding: Spacing.md},
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  profileInfo: {flex: 1},
  name: {fontSize: Typography.sizes.lg, fontWeight: 'bold'},
  role: {fontSize: Typography.sizes.xs, fontWeight: 'bold', marginVertical: 2},
  email: {fontSize: Typography.sizes.xs},
  section: {
    padding: Spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.sizes.md,
    fontWeight: 'bold',
    marginBottom: Spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.xs,
  },
  infoLabel: {fontSize: Typography.sizes.sm},
  infoValue: {fontSize: Typography.sizes.sm, fontWeight: '600'},
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  settingInfo: {flex: 1, marginRight: Spacing.sm},
  settingTitle: {fontSize: Typography.sizes.sm, fontWeight: 'bold'},
  settingSub: {fontSize: Typography.sizes.xs, marginTop: 2},
  logoutButton: {
    padding: Spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  logoutRow: {flexDirection: 'row', alignItems: 'center', gap: Spacing.xs},
  logoutText: {
    fontSize: Typography.sizes.md,
    fontWeight: 'bold',
  },
});

export default DriverSettingsScreen;
