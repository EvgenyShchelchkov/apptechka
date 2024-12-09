import { Box, Typography } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../shared/lib/hooks';
import styles from './FavoritePage.module.css';

export default function FavoritePage(): React.JSX.Element {
  const favorites = useAppSelector((state) => state.like.items);

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
    </Box>
  );
}
