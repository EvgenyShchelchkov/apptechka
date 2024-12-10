import CreateIcon from '@mui/icons-material/Create';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import MedicalInformationTwoToneIcon from '@mui/icons-material/MedicalInformationTwoTone';
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import React from 'react';
import { useAppDispatch } from '../../../../shared/lib/hooks';
import { deleteMedicineThunk } from '../../model/medicine.thunks';
import type { MedicineInstanceType } from '../../model/types';

type MedicineCardProps = {
  medicineInstance: MedicineInstanceType;
};

export default function MedicineCard({ medicineInstance }: MedicineCardProps): React.JSX.Element {
  const dispatch = useAppDispatch();

  const deleteHandler = (id: number | undefined): void => {
    if (!id) return;
    void dispatch(deleteMedicineThunk(id));
  };

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
          image={medicineInstance.Medicine?.img}
          sx={{
            objectFit: 'cover',
            width: '100%',
            maxHeight: 140,
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {medicineInstance.Medicine?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Тип: {medicineInstance.Medicine?.category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Описание: {medicineInstance.Medicine?.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Количество: {medicineInstance.quantity}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Срок годности: {new Date(medicineInstance.expiration).toLocaleDateString()}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
          <IconButton color="error">
            <MedicalInformationTwoToneIcon />
          </IconButton>
          <IconButton color="error">
            <CreateIcon />
          </IconButton>
          <IconButton color="error" onClick={() => deleteHandler(medicineInstance.id)}>
            <DeleteForeverTwoToneIcon />
          </IconButton>
        </Box>
      </Card>
    </Box>
  );
}
