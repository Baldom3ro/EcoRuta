// Pantalla para crear reporte - foto opcional
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {useTheme} from '../../context/ThemeContext';
import {useAuth} from '../../context/AuthContext';
import {ReportService} from '../../services';
import {Typography, Spacing, BorderRadius} from '../../theme';

type ReportType = 'missed_pickup' | 'overflowing' | 'blocked_access' | 'other';

const reportTypes: {value: ReportType; label: string; icon: string}[] = [
  {value: 'missed_pickup', label: 'No pasó la basura', icon: '🚛'},
  {value: 'overflowing', label: 'Contenedor lleno', icon: '🗑️'},
  {value: 'blocked_access', label: 'Acceso bloqueado', icon: '🚧'},
  {value: 'other', label: 'Otro', icon: '📝'},
];

const CreateReportScreen: React.FC = () => {
  const {colors} = useTheme();
  const {user} = useAuth();
  const [type, setType] = useState<ReportType>('missed_pickup');
  const [description, setDescription] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async () => {
    if (!description.trim()) {
      Alert.alert('Error', 'Escribe una descripción');
      return;
    }

    setSending(true);
    try {
      await ReportService.createReport({
        userId: user?.id || '',
        userName: user?.name || '',
        type,
        description,
        latitude: 20.6615,
        longitude: -103.3485,
      });
      Alert.alert('Enviado', 'Tu reporte fue enviado correctamente');
      setDescription('');
    } catch {
      Alert.alert('Error', 'No se pudo enviar el reporte');
    } finally {
      setSending(false);
    }
  };

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: colors.background}]}
      contentContainerStyle={styles.content}>
      <Text style={[styles.label, {color: colors.text}]}>Tipo de reporte</Text>
      <View style={styles.typesRow}>
        {reportTypes.map(rt => {
          const isSelected = type === rt.value;
          return (
            <TouchableOpacity
              key={rt.value}
              style={[
                styles.typeCard,
                {
                  backgroundColor: isSelected ? colors.primary : colors.surface,
                  borderColor: isSelected ? colors.primary : colors.border,
                },
              ]}
              onPress={() => setType(rt.value)}>
              <Text style={styles.typeIcon}>{rt.icon}</Text>
              <Text
                style={[
                  styles.typeLabel,
                  isSelected ? styles.selectedText : {color: colors.text},
                ]}>
                {rt.label}
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
        placeholder="Describe el problema..."
        placeholderTextColor={colors.textSecondary}
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
        textAlignVertical="top"
      />

      <TouchableOpacity
        style={[styles.photoButton, {borderColor: colors.border}]}>
        <Text style={[styles.photoText, {color: colors.textSecondary}]}>
          📷 Adjuntar foto (opcional)
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.submitButton,
          {backgroundColor: sending ? colors.textSecondary : colors.primary},
        ]}
        onPress={handleSubmit}
        disabled={sending}>
        <Text style={styles.submitText}>
          {sending ? 'Enviando...' : 'Enviar reporte'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  content: {padding: Spacing.lg, gap: Spacing.md},
  label: {fontSize: Typography.sizes.md, fontWeight: '600'},
  typesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  typeCard: {
    width: '47%',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    alignItems: 'center',
  },
  typeIcon: {fontSize: 28, marginBottom: Spacing.xs},
  typeLabel: {fontSize: Typography.sizes.sm, textAlign: 'center'},
  selectedText: {color: '#FFFFFF'},
  input: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    fontSize: Typography.sizes.md,
    minHeight: 100,
  },
  photoButton: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    alignItems: 'center',
  },
  photoText: {fontSize: Typography.sizes.md},
  submitButton: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  submitText: {color: '#FFF', fontSize: Typography.sizes.md, fontWeight: '600'},
});

export default CreateReportScreen;
