// Componente de Mapa Interactivo con OpenStreetMap y Leaflet JS
// Funciona en Web y Móvil sin requerir llaves de Google Maps
import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';

export interface MapViewProps {
  latitude?: number;
  longitude?: number;
  zoom?: number;
  truckLatitude?: number;
  truckLongitude?: number;
  truckName?: string;
  routePoints?: Array<{latitude: number; longitude: number; order?: number; label?: string}>;
  style?: StyleProp<ViewStyle>;
}

const iframeStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  border: 'none',
  borderRadius: 16,
};

const MapView: React.FC<MapViewProps> = ({
  latitude = 20.6625,
  longitude = -103.3475,
  zoom = 14,
  truckLatitude = 20.6610,
  truckLongitude = -103.3490,
  truckName = 'Camión EcoRuta 001',
  routePoints = [],
  style,
}) => {
  // Genera el HTML autocontenido con Leaflet y tiles de OpenStreetMap
  const pointsJson = JSON.stringify(routePoints);

  const leafletHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>
          html, body, #map {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            background: #F7F3E8;
          }
          .custom-truck-marker {
            font-size: 28px;
            text-align: center;
            line-height: 32px;
            filter: drop-shadow(0px 3px 6px rgba(0,0,0,0.4));
          }
          .custom-point-marker {
            background: #2E7D32;
            color: #FFFFFF;
            font-weight: bold;
            font-size: 11px;
            border-radius: 50%;
            width: 22px;
            height: 22px;
            text-align: center;
            line-height: 22px;
            border: 2px solid #FFFFFF;
            box-shadow: 0px 2px 5px rgba(0,0,0,0.3);
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          const centerLat = ${latitude};
          const centerLng = ${longitude};
          const truckLat = ${truckLatitude};
          const truckLng = ${truckLongitude};
          const points = ${pointsJson};

          const map = L.map('map', {
            zoomControl: false,
          }).setView([centerLat, centerLng], ${zoom});

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap',
            maxZoom: 19
          }).addTo(map);

          L.control.zoom({ position: 'bottomright' }).addTo(map);

          // Marcador del Camión
          const truckIcon = L.divIcon({
            html: '🚛',
            className: 'custom-truck-marker',
            iconSize: [32, 32],
            iconAnchor: [16, 16]
          });
          L.marker([truckLat, truckLng], { icon: truckIcon })
            .addTo(map)
            .bindPopup('<b>${truckName}</b><br/>En movimiento')
            .openPopup();

          // Puntos de ruta
          if (points && points.length > 0) {
            const latLngs = [];
            points.forEach((pt, idx) => {
              latLngs.push([pt.latitude, pt.longitude]);
              const pointIcon = L.divIcon({
                html: String(pt.order || idx + 1),
                className: 'custom-point-marker',
                iconSize: [22, 22],
                iconAnchor: [11, 11]
              });
              L.marker([pt.latitude, pt.longitude], { icon: pointIcon })
                .addTo(map)
                .bindPopup('<b>' + (pt.label || ('Punto ' + (idx + 1))) + '</b>');
            });

            // Trazar línea de ruta
            L.polyline(latLngs, {
              color: '#1F5F8C',
              weight: 4,
              opacity: 0.8,
              dashArray: '8, 8'
            }).addTo(map);
          }
        </script>
      </body>
    </html>
  `;

  return (
    <View style={[styles.container, style]}>
      <iframe
        srcDoc={leafletHtml}
        style={iframeStyle}
        title="OpenStreetMap EcoRuta"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    overflow: 'hidden',
  },
});

export default MapView;
