import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import FavoriteCard from '../../entities/favorite/ui/FavoriteCard';
import { useAppSelector } from '../../shared/lib/hooks';
import styles from './FavoritePage.module.css';

export default function FavoritePage(): React.JSX.Element {
  const favorites = useAppSelector((state) => state.favorite.items);

  return (
    <Box className={styles.pageContainer}>
      <Container maxWidth="xl">
        <Typography variant="h2" className={styles.title}>
          My Favorites
          <div className={styles.titleUnderline} />
        </Typography>

        {favorites.length === 0 ? (
          <Box className={styles.emptyState}>
            <Typography variant="h5">У вас пока нет избранных лекарств</Typography>
          </Box>
        ) : (
          <Box className={styles.cardContainer}>
            {favorites.map((favorite, index) => (
              <div
                className={styles.favoriteCard}
                key={favorite.id}
                style={{ '--index': index } as React.CSSProperties}
              >
                <FavoriteCard medicineInstanceId={favorite.medicine_instance_id} />
              </div>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}
