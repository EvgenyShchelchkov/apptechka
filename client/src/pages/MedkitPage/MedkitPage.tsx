import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { fetchMedkits } from '../../entities/medkit/model/medkit.thunk';
import { Box, Typography, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import { openCreateModal } from '../../entities/medkit/model/medkit.slice';
import MedkitCard from '../../entities/medkit/ui/MedkitCard/MedkitCard';
import ModalCreate from '../../entities/medkit/ui/ModalAdd/ModalCreate';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import styles from './MedkitPage.module.css';

export default function MedkitPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const medkits = useAppSelector((state) => state.medkit.items);

  const openCreateFormModal = (): void => {
    void dispatch(openCreateModal());
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

      <IconButton onClick={openAddFormHandler} className={styles.addButton}>
        <AddCircleIcon fontSize="inherit" />
      </IconButton>

      <ModalCreate />
    </Box>
  );
}
