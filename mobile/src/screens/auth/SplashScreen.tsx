// Pantalla Splash
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {useTheme} from '../../context/ThemeContext';
import {Typography, Spacing} from '../../theme';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({onFinish}) => {
  const {colors} = useTheme();

  useEffect(() => {
    const timer = setTimeout(onFinish, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={[styles.container, {backgroundColor: colors.primary}]}>
      <Text style={styles.logo}>♻️</Text>
      <Text style={styles.title}>EcoRuta</Text>
      <Text style={styles.subtitle}>Tu basura, nuestra ruta</Text>
      <ActivityIndicator
        size="large"
        color="#FFFFFF"
        style={styles.loader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 72,
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: Typography.sizes.title,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.sizes.md,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  loader: {
    marginTop: Spacing.xl,
  },
});

export default SplashScreen;
