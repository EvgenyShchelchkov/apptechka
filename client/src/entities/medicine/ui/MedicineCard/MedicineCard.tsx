import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CreateIcon from '@mui/icons-material/Create';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import MedicalInformationTwoToneIcon from '@mui/icons-material/MedicalInformationTwoTone';
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../shared/lib/hooks';
import { createFavoriteThunk, deleteFavoriteThunk } from '../../../favorite/model/favorites.thunks';
import { deleteMedicineThunk } from '../../model/medicine.thunks';
import type { MedicineInstanceType } from '../../model/types';
import styles from './MedicineCard.module.css';

type MedicineCardProps = {
  medicineInstance: MedicineInstanceType;
};

export default function MedicineCard({ medicineInstance }: MedicineCardProps): React.JSX.Element {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);
  const favorites = useAppSelector((state) =>
    state.favorite.items.filter(
      (favorite) => favorite.medicine_instance_id === medicineInstance.id,
    ),
  );
  const isFavorite = favorites.some((favorite) => favorite.user_id === user?.id);

  const createFavorite: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('medicine_instance_id', medicineInstance.id.toString());
    void dispatch(createFavoriteThunk(formData));
  };

  const deleteFavorite = (): void => {
    const favoriteId = favorites.find((favorite) => favorite.user_id === user?.id);
    if (!favoriteId) return;
    void dispatch(deleteFavoriteThunk(favoriteId.id));
  };

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
          {!isFavorite ? (
            <IconButton
              onClick={createFavorite}
              className={styles.starsButton}
              aria-label="favorite"
            >
              <AutoAwesomeIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={deleteFavorite}
              className={styles.starsButton}
              aria-label="favorite"
            >
              <AutoAwesomeIcon />
            </IconButton>
          )}
        </Box>
      </Card>
    </Box>
  );
}
