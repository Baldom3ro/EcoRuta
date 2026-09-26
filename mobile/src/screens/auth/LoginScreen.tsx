// Pantalla Login
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useAuth} from '../../context/AuthContext';
import {useTheme} from '../../context/ThemeContext';
import {Typography, Spacing, BorderRadius} from '../../theme';

const LoginScreen: React.FC = () => {
  const {loginWithGoogle, loginWithFacebook, loginAsDriver, isLoading} =
    useAuth();
  const {colors} = useTheme();

  if (isLoading) {
    return (
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Text style={styles.logo}>♻️</Text>
      <Text style={[styles.title, {color: colors.text}]}>EcoRuta</Text>
      <Text style={[styles.subtitle, {color: colors.textSecondary}]}>
        Rastrea tu camión de basura
      </Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.googleButton]}
          onPress={loginWithGoogle}>
          <Text style={styles.buttonText}>Continuar con Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.facebookButton]}
          onPress={loginWithFacebook}>
          <Text style={styles.buttonText}>Continuar con Facebook</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={[styles.dividerLine, {backgroundColor: colors.border}]} />
          <Text style={[styles.dividerText, {color: colors.textSecondary}]}>
            o
          </Text>
          <View style={[styles.dividerLine, {backgroundColor: colors.border}]} />
        </View>

        <TouchableOpacity
          style={[styles.button, {backgroundColor: colors.primary}]}
          onPress={() => loginAsDriver('driver@ecoruta.com', '1234')}>
          <Text style={styles.buttonText}>Entrar como conductor</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  logo: {
    fontSize: 64,
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: Typography.sizes.xxl,
    fontWeight: 'bold',
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.sizes.md,
    marginBottom: Spacing.xxl,
  },
  buttonsContainer: {
    width: '100%',
    gap: Spacing.md,
  },
  button: {
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  googleButton: {
    backgroundColor: '#DB4437',
  },
  facebookButton: {
    backgroundColor: '#4267B2',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: Typography.sizes.md,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.sm,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: Spacing.md,
    fontSize: Typography.sizes.sm,
  },
});

export default LoginScreen;
