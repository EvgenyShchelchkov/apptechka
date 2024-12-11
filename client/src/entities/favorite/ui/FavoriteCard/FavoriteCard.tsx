// FavoriteCard.tsx
import { Badge, Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../shared/lib/hooks';
import type { MedicineType } from '../../../medicine/model/types';
import { setIsHovered } from '../../model/favorites.slice';
import styles from './FavoriteCard.module.css';

type FavoriteCardProps = {
  favoriteMedicinesId: MedicineType['id'];
};

export default function FavoriteCard({
  favoriteMedicinesId,
}: FavoriteCardProps): React.JSX.Element {
  const navigate = useNavigate();
  const isHovered = useAppSelector((state) => state.favorite.isHovered);
  const medicine = useAppSelector((state) =>
    state.medicine.items.find((el) => el.id === favoriteMedicinesId),
  );

  const isAvailableInMedkits = useAppSelector((state) =>
    state.medkit.items.map((el) =>
      el.MedicineInstances.some(
        (value) => value.medicine_id === favoriteMedicinesId && value.quantity > 0,
      ),
    ),
  );

  const handleCardClick = (): void => {
    if (medicine) {
      navigate(`/medkit/${medicine}`);
    }
  };

  return (
    <Card
      elevation={isHovered ? 12 : 4}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      className={`${styles.card} ${isHovered ? styles.cardHovered : ''}`}
      sx={{ cursor: 'pointer' }}
    >
      <Badge
        color={isAvailableInMedkits ? 'success' : 'error'}
        variant="dot"
        className={`${styles.badge} ${isAvailableInMedkits ? styles.badgeSuccess : styles.badgeError}`}
      />

      <CardMedia
        component="img"
        alt={medicine?.name}
        image={medicine?.img}
        className={`${styles.media} ${isHovered ? styles.mediaHovered : ''}`}
      />

      <CardContent className={`${styles.content} ${isHovered ? styles.contentHovered : ''}`}>
        <Typography
          variant="h5"
          className={`${styles.title} ${isHovered ? styles.titleHovered : ''}`}
        >
          {medicine?.name}
        </Typography>

        <Box className={`${styles.description} ${isHovered ? styles.descriptionHovered : ''}`}>
          <Typography variant="body1" className={styles.descriptionText}>
            {medicine?.description}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
