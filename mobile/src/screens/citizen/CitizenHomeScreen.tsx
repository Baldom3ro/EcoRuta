// Home Ciudadano - Mapa Interactivo OpenStreetMap + ETA + Consejos (HU-C01, HU-C05, views.md 3.3, design-system.md)
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useTheme} from '../../context/ThemeContext';
import MapView from '../../components/MapView';
import {TruckService} from '../../services';
import {TruckLocation, Tip} from '../../services/types';
import {Typography, Spacing} from '../../theme';

const CitizenHomeScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const {colors} = useTheme();
  const [truckLoc, setTruckLoc] = useState<TruckLocation | null>(null);
  const [tips, setTips] = useState<Tip[]>([]);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const loc = await TruckService.getTruckLocation();
        const tipsData = await TruckService.getTips();
        setTruckLoc(loc);
        setTips(tipsData);
      } catch {
        // Ignorar
      }
    };
    loadData();

    // Actualiza ubicación del camión cada 5 segundos
    const interval = setInterval(async () => {
      const updatedLoc = await TruckService.getTruckLocation();
      setTruckLoc(updatedLoc);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextTip = () => {
    if (tips.length > 0) {
      setCurrentTipIndex((prev) => (prev + 1) % tips.length);
    }
  };

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: colors.background}]}
      contentContainerStyle={styles.content}>
      {/* Estado del Servicio / ETA Banner */}
      <View
        style={[
          styles.etaCard,
          {backgroundColor: colors.primary, shadowColor: colors.shadow},
        ]}>
        <View style={styles.etaHeader}>
          <Text style={styles.etaBadgeText}>● SERVICIO ACTIVO</Text>
          <Text style={styles.etaTime}>~15 MINUTOS</Text>
        </View>
        <Text style={styles.etaSubtext}>
          Camión EcoRuta 001 a ~450m de tu domicilio
        </Text>
      </View>

      {/* Mapa Interactivo con OpenStreetMap */}
      <View style={[styles.mapCard, {borderColor: colors.border}]}>
        <MapView
          latitude={20.6625}
          longitude={-103.3475}
          truckLatitude={truckLoc ? truckLoc.latitude : 20.6610}
          truckLongitude={truckLoc ? truckLoc.longitude : -103.3490}
          truckName={truckLoc ? truckLoc.driverName : 'Carlos Rodríguez'}
          routePoints={[
            {latitude: 20.6600, longitude: -103.3500, order: 1, label: 'Inicio Ruta'},
            {latitude: 20.6610, longitude: -103.3490, order: 2, label: 'Calle Morelos'},
            {latitude: 20.6625, longitude: -103.3475, order: 3, label: 'Av. Juárez'},
            {latitude: 20.6640, longitude: -103.3460, order: 4, label: 'Plaza Central'},
            {latitude: 20.6655, longitude: -103.3445, order: 5, label: 'Col. San Marcos'},
          ]}
        />
      </View>

      {/* Acciones Rápidas */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={[styles.actionBtn, {backgroundColor: colors.secondary}]}
          onPress={() => navigation.navigate('Reports')}>
          <Text style={styles.actionBtnText}>🚨 Reportar Problema</Text>
        </TouchableOpacity>
      </View>

      {/* Consejos sobre Buenas Prácticas (HU-C05) */}
      {tips.length > 0 && (
        <TouchableOpacity
          style={[
            styles.tipCard,
            {backgroundColor: colors.surface, borderColor: colors.border},
          ]}
          onPress={nextTip}>
          <Text style={styles.tipIcon}>{tips[currentTipIndex]?.icon || '💡'}</Text>
          <View style={styles.tipBody}>
            <Text style={[styles.tipTitle, {color: colors.primary}]}>
              Consejo EcoRuta #{currentTipIndex + 1}
            </Text>
            <Text style={[styles.tipText, {color: colors.text}]}>
              {tips[currentTipIndex]?.message}
            </Text>
          </View>
          <Text style={[styles.tipNext, {color: colors.textSecondary}]}>▶</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  content: {padding: Spacing.md},
  etaCard: {
    padding: Spacing.md,
    borderRadius: 16,
    marginBottom: Spacing.md,
    elevation: 3,
  },
  etaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  etaBadgeText: {
    color: '#FFFFFF',
    fontSize: Typography.sizes.xs,
    fontWeight: 'bold',
  },
  etaTime: {
    color: '#FFFFFF',
    fontSize: Typography.sizes.lg,
    fontWeight: 'bold',
  },
  etaSubtext: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: Typography.sizes.sm,
  },
  mapCard: {
    height: 300,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: Spacing.md,
    overflow: 'hidden',
  },
  actionsRow: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  actionBtn: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontSize: Typography.sizes.sm,
    fontWeight: 'bold',
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: 16,
    borderWidth: 1,
  },
  tipIcon: {
    fontSize: 28,
    marginRight: Spacing.sm,
  },
  tipBody: {
    flex: 1,
  },
  tipTitle: {
    fontSize: Typography.sizes.xs,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  tipText: {
    fontSize: Typography.sizes.sm,
  },
  tipNext: {
    fontSize: Typography.sizes.xs,
    marginLeft: Spacing.xs,
  },
});

export default CitizenHomeScreen;
