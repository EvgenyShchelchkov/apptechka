import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import type { MedicineType } from '../../model/types';

type AllMedicineProps = {
  medicine: MedicineType;
};

export default function AllMedicineCard({ medicine }: AllMedicineProps): React.JSX.Element {
  return (
    <Box sx={{ padding: 2 }}>
      <Card
        sx={{
          width: 300,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={medicine.img || 'https://via.placeholder.com/150'} // Резервное изображение
          sx={{
            objectFit: 'cover',
            width: '100%',
            maxHeight: 140,
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {medicine.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Тип: {medicine.category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Описание: {medicine.description}
          </Typography>

          {/* Информация о количестве и сроке годности */}
          {medicine.MedicineInstances && medicine.MedicineInstances.length > 0 && (
            <Box>
              <Typography variant="body2" color="text.secondary">
                Количество: {medicine.MedicineInstances[0].quantity}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Срок годности:{' '}
                {new Date(medicine.MedicineInstances[0].expiration).toLocaleDateString()}
              </Typography>
            </Box>
          )}

          {medicine.MedicineInstances && medicine.MedicineInstances.length > 0 && (
            <Box>
              <Typography variant="body2" color="text.secondary">
                Находится в аптечках:
              </Typography>
              <ul>
                {medicine.MedicineInstances.map(
                  (instance) =>
                    instance.MedKit && <li key={instance.MedKit.id}>{instance.MedKit.name}</li>,
                )}
              </ul>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
