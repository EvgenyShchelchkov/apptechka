import { Box, IconButton, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MedicineCard from '../../entities/medicine/ui/MedicineCard/MedicineCard';
import { fetchOneMedkit } from '../../entities/medkit/model/medkit.thunk';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import styles from '../MedkitPage/MedkitPage.module.css';
import { openCreateMedicineModal } from '../../entities/medicine/model/medicine.slice';
import ModalCreateMedicine from '../../entities/medicine/ui/ModalCreateMedicine';
import ModalUpdateMedicine from '../../entities/medicine/ui/ModalUpdateMedicine';

export default function OneMedkitPage(): React.JSX.Element {
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const oneMedkit = useAppSelector((state) => state.medkit.medkitList);
<<<<<<< HEAD

  const openCreateMedicineFormModal = (): void => {
    void dispatch(openCreateMedicineModal());
  };
=======
>>>>>>> FavoritePage

  useEffect(() => {
    void dispatch(fetchOneMedkit(Number(id)));
  }, [dispatch, id]);

  return (
    <>
      <Box sx={{ padding: 2, position: 'relative' }}>
        <Typography variant="h4" gutterBottom>
          My Medicines
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'space-around',
          }}
        >
          {oneMedkit?.MedicineInstances?.map((el) => (
            <MedicineCard key={el.id} medicineInstance={el} />
          ))}
        </Box>

        {/* Кнопка добавления */}
        <IconButton onClick={openCreateMedicineFormModal} className={styles.button}>
          <AddCircleIcon fontSize="inherit" />
        </IconButton>
      </Box>
      {/* <ModalUpdateMedicine /> */}
      <ModalCreateMedicine />
    </>
  );
}
