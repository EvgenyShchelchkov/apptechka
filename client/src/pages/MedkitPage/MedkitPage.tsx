import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import { openCreateModal } from '../../entities/medkit/model/medkit.slice';
import MedkitCard from '../../entities/medkit/ui/MedkitCard/MedkitCard';
import ModalCreate from '../../entities/medkit/ui/ModalCreate';
import ModalUpdate from '../../entities/medkit/ui/ModalUpdate';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import styles from './MedkitPage.module.css';

export default function MedkitPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const medkits = useAppSelector((state) => state.medkit.items);

  const openCreateFormModal = (): void => {
    void dispatch(openCreateModal());
  };

  return (
    <>
      <Box className={styles.pageContainer}>
        <Typography variant="h4" className={styles.title}>
          My Medicine Kits
        </Typography>
        <Box className={styles.cardContainer}>
          {medkits.map((medkit) => (
            <div className={styles.medkitCard} key={medkit.id}>
              <MedkitCard medkit={medkit} />
            </div>
          ))}
        </Box>
        <IconButton onClick={openCreateFormModal} className={styles.button}>
          <AddCircleIcon fontSize="inherit" />
        </IconButton>
      </Box>
      <ModalCreate />
      <ModalUpdate />
    </>
  );
}
