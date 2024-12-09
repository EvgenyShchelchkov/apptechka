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
    <Box className={styles.pageContainer}>
      <Typography variant="h4" className={styles.title}>
        My Medkits
      </Typography>
      <Box className={styles.cardContainer}>
        {medkits.map((medkit) => (
          <MedkitCard key={medkit.id} medkit={medkit} />
        ))}
      </Box>

      <IconButton onClick={openCreateFormModal} className={styles.button}>
        <AddCircleIcon fontSize="inherit" />
      </IconButton>

      <ModalCreate />
    </Box>
  );
}
