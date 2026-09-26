// Home Conductor - Vista principal operador
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '../../context/ThemeContext';
import {Typography, Spacing} from '../../theme';

const DriverHomeScreen: React.FC = () => {
  const {colors} = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={[styles.mapPlaceholder, {backgroundColor: colors.surface}]}>
        <Text style={[styles.mapText, {color: colors.textSecondary}]}>
          🗺️ Ruta asignada aquí
        </Text>
      </View>
      <View style={[styles.statusCard, {backgroundColor: colors.primary}]}>
        <Text style={styles.statusText}>Ruta: Centro - Mañana</Text>
        <Text style={styles.statusSubtext}>Estado: Activa</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    fontSize: Typography.sizes.lg,
  },
  statusCard: {
    margin: Spacing.md,
    padding: Spacing.md,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: Typography.sizes.lg,
    fontWeight: 'bold',
  },
  statusSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: Typography.sizes.sm,
    marginTop: Spacing.xs,
  },
});

export default DriverHomeScreen;
