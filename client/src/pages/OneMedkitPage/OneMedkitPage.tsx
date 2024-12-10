import { Box, IconButton, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MedicineCard from '../../entities/medicine/ui/MedicineCard/MedicineCard';
import { fetchOneMedkit } from '../../entities/medkit/model/medkit.thunk';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';

export default function OneMedkitPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const oneMedkit = useAppSelector((state) => state.medkit.medkitList);
  console.log(oneMedkit);

  useEffect(() => {
    void dispatch(fetchOneMedkit(Number(id)));
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
        {oneMedkit?.MedicineInstances.map((el) => (
          <MedicineCard key={el.id} medicineInstance={el} />
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
