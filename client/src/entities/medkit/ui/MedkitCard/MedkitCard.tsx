import React from 'react';
import type { MedkitT } from '../../model/types';
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import MedicalInformationTwoToneIcon from '@mui/icons-material/MedicalInformationTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { useAppDispatch } from '../../../../shared/lib/hooks';
import { openEditModal } from '../../model/medkitSlice';
import ModalUpdate from '../ModalUpdate/ModalUpdate';
import { deleteMedkit } from '../../model/medkit.thunk';

type MedkitCardProps = {
  medkit: MedkitT;
};

export default function MedkitCard({ medkit }: MedkitCardProps): React.JSX.Element {
  const dispatch = useAppDispatch();

  const handleEditClick = (): void => {
    void dispatch(openEditModal(medkit));
  };

  const deleteHandler = (id: number | undefined): void => {
    if (!id) return;
    void dispatch(deleteMedkit(id));
  };

  return (
    <>
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
            image={medkit.img}
            sx={{
              objectFit: 'cover',
              width: '100%',
              maxHeight: 140,
            }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {medkit.name}
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
            <IconButton color="error">
              <MedicalInformationTwoToneIcon />
            </IconButton>
            <IconButton color="error" onClick={handleEditClick}>
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
