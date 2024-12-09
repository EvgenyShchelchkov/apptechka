import React, { useEffect } from 'react';
// import { useAppSelector } from '../../shared/lib/hooks';

import { Box, IconButton, Typography } from '@mui/material';
import MedicineCard from '../../entities/medicine/ui/MedicineCard/MedicineCard';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { fetchOneMedkit } from '../../entities/medkit/model/medkit.thunk';
import { useParams } from 'react-router-dom';

export default function OneMedkitPage(): React.JSX.Element {
  const dispatch = useAppDispatch();

  const { id } = useParams();

  
  const oneMedkits = useAppSelector((state) => state.medkit.selected);
  console.log(oneMedkits);

  useEffect(() => {
    void dispatch(fetchOneMedkit(id));
  }, [dispatch, id]);
  return (
    <Box sx={{ padding: 2, position: 'relative' }}>
      <Typography variant="h4" gutterBottom>
        My Medkits
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: 'space-around',
        }}
      >
       {oneMedkits && oneMedkits.MedicineInstances?.map((el) => (
    <MedicineCard key={el.id} medicineInstances={el.Medicine} />
))}
      </Box>

      {/* Кнопка добавления */}
      <IconButton
        // onClick={openAddHandler}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          color: 'red',
          fontSize: '3rem', // Увеличение размера
        }}
      >
        {/* <AddCircleIcon fontSize="inherit" /> */}
      </IconButton>

      {/* <ModalAdd /> */}
    </Box>
  );
}
