import { Box, Typography } from '@mui/material';
import React from 'react';
import FavoriteCard from '../../entities/favorite/ui/FavoriteCard';
import { useAppSelector } from '../../shared/lib/hooks';
import styles from './FavoritePage.module.css';

export default function FavoritePage(): React.JSX.Element {
  const favoriteMedicines = useAppSelector((state) => [
    ...new Set(state.favorite.items.map((el) => el.MedicineInstance.medicine_id)),
  ]);

  return (
    <>
      <Box className={styles.pageContainer}>
        <Typography variant="h4" className={styles.title}>
          My Favorites
        </Typography>

        {favoriteMedicines.length === 0 ? (
          <Box className={styles.emptyState}>
            <Typography variant="h5">У вас пока нет избранных лекарств</Typography>
          </Box>
        ) : (
          <Box className={styles.cardContainer}>
            {favoriteMedicines.map((favorite, index) => (
              <div
                className={styles.favoriteCard}
                key={favorite}
                style={{ '--index': index } as React.CSSProperties}
              >
                <FavoriteCard favoriteMedicinesId={favorite} />
              </div>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
}
