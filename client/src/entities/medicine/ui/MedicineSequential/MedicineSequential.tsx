import Masonry from '@mui/lab/Masonry';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import { useAppSelector } from '../../../../shared/lib/hooks';
import styles from './MedicineSequential.module.css';

export default function MedicineSequential(): React.JSX.Element {
  const medicines = useAppSelector((state) => state.medicine.items);

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Masonry columns={4} spacing={2}>
        {medicines.map((medicine) => (
          <Paper key={medicine.code} className={styles.item}>
            <img src={medicine.img} alt={medicine.name} className={styles.medicineImage} />
            <h3 className={styles.medicineName}>{medicine.name}</h3>
            <p className={styles.medicineDescription}>{medicine.description}</p>
          </Paper>
        ))}
      </Masonry>
    </Box>
  );
}
