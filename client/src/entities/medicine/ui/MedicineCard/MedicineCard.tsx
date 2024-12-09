import React from 'react';
import type { MedicineType } from '../../model/types';
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import MedicalInformationTwoToneIcon from '@mui/icons-material/MedicalInformationTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { useAppDispatch } from '../../../../shared/lib/hooks';

// import ModalUpdate from '../ModalUpdate/ModalUpdate';
import { deleteMedicineThunk } from '../../model/medicine.thunks';

// type MedicineCardProps = {
//   medicine.Medicine: MedicineType;
// };

export default function MedicineCard({ medicineInstances }): React.JSX.Element {
  const dispatch = useAppDispatch();

  const deleteHandler = (id: number | undefined): void => {
    if (!id) return;
    void dispatch(deleteMedicineThunk(id));
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
            image={medicineInstances.img}
            sx={{
              objectFit: 'cover',
              width: '100%',
              maxHeight: 140,
            }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {medicineInstances.name}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {medicineInstances.category}
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
            <IconButton color="error">
              <MedicalInformationTwoToneIcon />
            </IconButton>
            <IconButton color="error">
              <CreateIcon />
            </IconButton>
            <IconButton color="error" onClick={() => deleteHandler(medicineInstances.id)}>
              <DeleteForeverTwoToneIcon />
            </IconButton>
          </Box>
        </Card>
      </Box>
      {/* <ModalUpdate /> */}
    </>
  );
}
