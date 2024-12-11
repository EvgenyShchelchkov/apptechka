// DrugstorePage.tsx
import { Box, Card, CardContent, Paper, Typography } from '@mui/material';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import styles from './DrugstorePage.module.css';

// Фиксим иконку маркера для Leaflet
// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//   iconUrl: require('leaflet/dist/images/marker-icon.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
// });

// Тестовые данные аптек
const pharmacies = [
  {
    id: 1,
    name: 'Аптека Здоровье',
    address: 'ул. Ленина, 1',
    latitude: 55.751244,
    longitude: 37.618423,
    workingHours: '9:00 - 21:00',
    phone: '+7 (999) 123-45-67',
  },
  {
    id: 2,
    name: 'Социальная аптека',
    address: 'пр. Мира, 10',
    latitude: 55.753215,
    longitude: 37.622504,
    workingHours: '8:00 - 22:00',
    phone: '+7 (999) 765-43-21',
  },
  {
    id: 3,
    name: 'Аптека 36.6',
    address: 'ул. Тверская, 15',
    latitude: 55.757777,
    longitude: 37.614231,
    workingHours: 'Круглосуточно',
    phone: '+7 (999) 111-22-33',
  },
];

export default function DrugstorePage(): React.JSX.Element {
  return (
    <Box className={styles.container}>
      <Typography variant="h4" gutterBottom>
        Ближайшие аптеки
      </Typography>

      <Box className={styles.content}>
        {/* Список аптек */}
        <Paper className={styles.pharmacyList}>
          {pharmacies.map((pharmacy) => (
            <Card key={pharmacy.id} className={styles.pharmacyCard}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {pharmacy.name}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {pharmacy.address}
                </Typography>
                <Typography variant="body2">Режим работы: {pharmacy.workingHours}</Typography>
                <Typography variant="body2">Телефон: {pharmacy.phone}</Typography>
              </CardContent>
            </Card>
          ))}
        </Paper>

        {/* Карта */}
        <Paper className={styles.mapContainer}>
          <MapContainer center={[55.751244, 37.618423]} zoom={13} className={styles.map}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {pharmacies.map((pharmacy) => (
              <Marker key={pharmacy.id} position={[pharmacy.latitude, pharmacy.longitude]}>
                <Popup>
                  <Typography variant="subtitle1">{pharmacy.name}</Typography>
                  <Typography variant="body2">{pharmacy.address}</Typography>
                  <Typography variant="body2">{pharmacy.workingHours}</Typography>
                  <Typography variant="body2">{pharmacy.phone}</Typography>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Paper>
      </Box>
    </Box>
  );
}
