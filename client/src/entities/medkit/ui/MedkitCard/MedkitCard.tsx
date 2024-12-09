import CreateIcon from '@mui/icons-material/Create';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import MedicalInformationTwoToneIcon from '@mui/icons-material/MedicalInformationTwoTone';
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import React from 'react';
import { useAppDispatch } from '../../../../shared/lib/hooks';
import { selectMedkit } from '../../model/medkit.slice';
import { deleteMedkitThunk } from '../../model/medkit.thunk';
import type { MedkitType } from '../../model/types';
import ModalUpdate from '../ModalUpdate/ModalUpdate';
import styles from './MedkitCard.module.css';

type MedkitCardProps = {
  medkit: MedkitType;
};

export default function MedkitCard({ medkit }: MedkitCardProps): React.JSX.Element {
  const dispatch = useAppDispatch();

  const deleteHandler = (): void => {
    void dispatch(deleteMedkitThunk(medkit.id));
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
            <IconButton color="error" onClick={() => void dispatch(selectMedkit(medkit))}>
              <CreateIcon />
            </IconButton>
            <IconButton color="error" onClick={deleteHandler}>
              <DeleteForeverTwoToneIcon />
            </IconButton>
          </Box>
        </Card>
      </Box>
      <ModalUpdate />
    </>
  );
}
