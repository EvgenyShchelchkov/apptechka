import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { fetchMedkits } from '../../entities/medkit/model/medkit.thunk';
import { Box, Typography, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { openAddModal } from '../../entities/medkit/model/medkitSlice';
import ModalAdd from '../../entities/medkit/ui/ModalAdd/ModalAdd';
import MedkitCard from '../../entities/medkit/ui/MedkitCard/MedkitCard';

export default function MedkitPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const medkits = useAppSelector((state) => state.medkit.list);

  useEffect(() => {
    void dispatch(fetchMedkits());
  }, [dispatch]);

  const openAddHandler = (): void => {
    void dispatch(openAddModal());
  };

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
        {medkits.map((medkit) => (
          <MedkitCard key={medkit.id} medkit={medkit} />
        ))}
      </Box>

      {/* Кнопка добавления */}
      <IconButton
        onClick={openAddHandler}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          color: 'red',
          fontSize: '3rem', // Увеличение размера
        }}
      >
        <AddCircleIcon fontSize="inherit" />
      </IconButton>

      <ModalAdd />
    </Box>
  );
}
