// Home Ciudadano - Mapa + Consejos
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '../../context/ThemeContext';
import {Typography, Spacing} from '../../theme';

const CitizenHomeScreen: React.FC = () => {
  const {colors} = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={[styles.mapPlaceholder, {backgroundColor: colors.surface}]}>
        <Text style={[styles.mapText, {color: colors.textSecondary}]}>
          🗺️ Mapa aquí
        </Text>
      </View>
      <View style={[styles.tipCard, {backgroundColor: colors.surface}]}>
        <Text style={styles.tipIcon}>♻️</Text>
        <Text style={[styles.tipText, {color: colors.text}]}>
          Coloca la basura en un lugar accesible
        </Text>
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
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: Spacing.md,
    padding: Spacing.md,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  tipIcon: {
    fontSize: 24,
    marginRight: Spacing.sm,
  },
  tipText: {
    flex: 1,
    fontSize: Typography.sizes.sm,
  },
});

export default CitizenHomeScreen;
