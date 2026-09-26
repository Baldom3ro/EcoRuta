// Configuración global de la app
// Cambiar USE_MOCK_DATA a false cuando la API real esté disponible

export const Config = {
  USE_MOCK_DATA: true, // ← cambiar a false cuando haya API
  API_BASE_URL: 'https://api.ecoruta.com/v1', // URL futura de la API
  MAP_DEFAULT_REGION: {
    latitude: 20.6597,  // Aguascalientes (ajustar a tu ciudad)
    longitude: -103.3496,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  },
  TRUCK_UPDATE_INTERVAL: 5000, // ms entre actualizaciones de ubicación
  PROXIMITY_ALERT_DISTANCE: 500, // metros para alerta de proximidad
  TIME_ESTIMATE_ALERT_MINUTES: 15, // minutos para alerta de tiempo
};
