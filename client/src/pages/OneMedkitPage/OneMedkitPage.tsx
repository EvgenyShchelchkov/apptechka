import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { fetchOneMedkit } from '../../entities/medkit/model/medkit.thunk';
import { Box, IconButton, Typography } from '@mui/material';
import MedicineCard from '../../entities/medicine/ui/MedicineCard/MedicineCard';

export default function OneMedkitPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const oneMedkids = useAppSelector((state) => state.medicine.items);
  return (
    <Box sx={{ padding: 2, position: 'relative' }}>
      <Typography variant="h4" gutterBottom>
        My Medkits
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: 'space-around',
        }}
      >
        {oneMedkids.map((medicine) => (
          <MedicineCard key={medicine.id} medicine={medicine} />
        ))}
      </Box>

      {/* Кнопка добавления */}
      <IconButton
        // onClick={openAddHandler}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          color: 'red',
          fontSize: '3rem', // Увеличение размера
        }}
      >
        {/* <AddCircleIcon fontSize="inherit" /> */}
      </IconButton>

      {/* <ModalAdd /> */}
    </Box>
  );
}
