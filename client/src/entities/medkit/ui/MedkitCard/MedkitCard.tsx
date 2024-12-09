import CreateIcon from '@mui/icons-material/Create';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import MedicalInformationTwoToneIcon from '@mui/icons-material/MedicalInformationTwoTone';
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import React from 'react';
import { useAppDispatch } from '../../../../shared/lib/hooks';
import { openModal } from '../../model/medkit.slice';
import { deleteMedkitThunk } from '../../model/medkit.thunk';
import type { MedkitType } from '../../model/types';
import ModalUpdate from '../ModalUpdate/ModalUpdate';
import styles from './MedkitCard.module.css';

type MedkitCardProps = {
  medkit: MedkitType;
};

export default function MedkitCard({ medkit }: MedkitCardProps): React.JSX.Element {
  const dispatch = useAppDispatch();

  const editHandler = (medkit: MedkitType): void => {
    void dispatch(openModal(medkit));
  };

  const deleteHandler = (id: number): void => {
    if (!id) return;
    void dispatch(deleteMedkitThunk(id));
  };

  return (
    <>
      <Box className={styles.container}>
        <Card className={styles.card}>
          <CardMedia component="img" height="140" image={medkit.img} className={styles.cardMedia} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {medkit.name}
            </Typography>
          </CardContent>
          <Box className={styles.iconContainer}>
            <IconButton color="error">
              <MedicalInformationTwoToneIcon />
            </IconButton>
            <IconButton color="error" onClick={editHandler}>
              <CreateIcon />
            </IconButton>
            <IconButton color="error" onClick={() => deleteHandler(medkit.id)}>
              <DeleteForeverTwoToneIcon />
            </IconButton>
          </Box>
        </Card>
      </Box>
      <ModalUpdate />
    </>
  );
}
