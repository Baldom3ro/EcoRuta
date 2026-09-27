// Pantalla de Reportar Incidente / Percance para el conductor
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import {useTheme} from '../../context/ThemeContext';
import {useAuth} from '../../context/AuthContext';
import {TruckService} from '../../services';
import {Icon, IconName} from '../../components/Icon';
import {Typography, Spacing} from '../../theme';

type IncidentType = 'breakdown' | 'road_block' | 'accident' | 'other';

const INCIDENT_TYPES: {key: IncidentType; label: string; icon: IconName}[] = [
  {key: 'breakdown', label: 'Falla Mecánica', icon: 'wrench'},
  {key: 'road_block', label: 'Calle Bloqueada', icon: 'barrier'},
  {key: 'accident', label: 'Accidente', icon: 'alert'},
  {key: 'other', label: 'Otro Percance', icon: 'warning'},
];

const ReportIncidentScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const {colors} = useTheme();
  const {user} = useAuth();
  const [selectedType, setSelectedType] = useState<IncidentType>('breakdown');
  const [description, setDescription] = useState('');
  const [notifySupervisor, setNotifySupervisor] = useState(true);
  const [alertUsers, setAlertUsers] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!description.trim()) {
      Alert.alert('Error', 'Ingresa una descripción del percance.');
      return;
    }

    setLoading(true);
    try {
      await TruckService.reportIncident({
        driverId: user?.id || 'driver-001',
        routeId: 'route-001',
        type: selectedType,
        description: description.trim(),
        latitude: 20.6610,
        longitude: -103.3490,
        notifiedSupervisor: notifySupervisor,
        alertSentToUsers: alertUsers,
      });

      Alert.alert(
        'Incidente Reportado',
        alertUsers
          ? 'Se ha notificado al supervisor y enviado alerta masiva a ciudadanos.'
          : 'Se ha notificado al supervisor.',
        [
          {
            text: 'OK',
            onPress: () => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.navigate('AlertsTab', {screen: 'AlertsList'});
              }
            },
          },
        ],
      );
    } catch {
      Alert.alert('Error', 'No se pudo enviar el reporte.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: colors.background}]}
      contentContainerStyle={styles.content}>
      <Text style={[styles.title, {color: colors.text}]}>
        Reportar Percance en Ruta
      </Text>
      <Text style={[styles.subtitle, {color: colors.textSecondary}]}>
        Notifica a tu supervisor o suspende la ruta si es necesario
      </Text>

      <Text style={[styles.label, {color: colors.text}]}>Tipo de Incidente</Text>
      <View style={styles.typesGrid}>
        {INCIDENT_TYPES.map(item => {
          const isSelected = selectedType === item.key;
          const iconColor = isSelected ? '#FFFFFF' : colors.primary;
          return (
            <TouchableOpacity
              key={item.key}
              style={[
                styles.typeCard,
                {
                  backgroundColor: isSelected ? colors.primary : colors.surface,
                  borderColor: isSelected ? colors.primary : colors.border,
                },
              ]}
              onPress={() => setSelectedType(item.key)}>
              <View style={styles.iconBox}>
                <Icon name={item.icon} size={26} color={iconColor} />
              </View>
              <Text
                style={[
                  styles.typeLabel,
                  isSelected ? styles.selectedText : {color: colors.text},
                ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={[styles.label, {color: colors.text}]}>Descripción</Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.surface,
            color: colors.text,
            borderColor: colors.border,
          },
        ]}
        placeholder="Describe la situación (ej. neumático ponchado en Av. Juárez)..."
        placeholderTextColor={colors.textSecondary}
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
      />

      <View style={[styles.switchRow, {backgroundColor: colors.surface, borderColor: colors.border}]}>
        <View style={styles.switchInfo}>
          <Text style={[styles.switchTitle, {color: colors.text}]}>
            Notificar a Supervisor
          </Text>
          <Text style={[styles.switchSub, {color: colors.textSecondary}]}>
            Envía reporte directo al panel de control
          </Text>
        </View>
        <Switch
          value={notifySupervisor}
          onValueChange={setNotifySupervisor}
          trackColor={{false: colors.border, true: colors.primary}}
        />
      </View>

      <View style={[styles.switchRow, {backgroundColor: colors.surface, borderColor: colors.border}]}>
        <View style={styles.switchInfo}>
          <Text style={[styles.switchTitle, {color: colors.text}]}>
            Alerta Masiva a Ciudadanos (HU-D04)
          </Text>
          <Text style={[styles.switchSub, {color: colors.textSecondary}]}>
            Notifica suspensión de ruta a usuarios de la zona
          </Text>
        </View>
        <Switch
          value={alertUsers}
          onValueChange={setAlertUsers}
          trackColor={{false: colors.border, true: colors.primary}}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.submitButton,
          {backgroundColor: loading ? colors.textSecondary : colors.error},
        ]}
        onPress={handleSubmit}
        disabled={loading}>
        <View style={styles.btnRow}>
          <Icon name="alert" size={18} color="#FFFFFF" />
          <Text style={styles.submitText}>
            {loading ? 'Enviando...' : 'Enviar Reporte de Incidente'}
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  content: {padding: Spacing.md},
  btnRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6},
  title: {fontSize: Typography.sizes.xl, fontWeight: 'bold', marginBottom: Spacing.xs},
  subtitle: {fontSize: Typography.sizes.sm, marginBottom: Spacing.lg},
  label: {fontSize: Typography.sizes.md, fontWeight: 'bold', marginBottom: Spacing.xs, marginTop: Spacing.sm},
  typesGrid: {flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginBottom: Spacing.md},
  typeCard: {
    width: '47%',
    padding: Spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  iconBox: {marginBottom: Spacing.xs},
  typeLabel: {fontSize: Typography.sizes.sm, fontWeight: '600', textAlign: 'center'},
  selectedText: {color: '#FFFFFF'},
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: Spacing.md,
    textAlignVertical: 'top',
    fontSize: Typography.sizes.md,
    marginBottom: Spacing.md,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  switchInfo: {flex: 1, marginRight: Spacing.sm},
  switchTitle: {fontSize: Typography.sizes.sm, fontWeight: 'bold'},
  switchSub: {fontSize: Typography.sizes.xs, marginTop: 2},
  submitButton: {
    padding: Spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  submitText: {color: '#FFFFFF', fontSize: Typography.sizes.md, fontWeight: 'bold'},
});

export default ReportIncidentScreen;
