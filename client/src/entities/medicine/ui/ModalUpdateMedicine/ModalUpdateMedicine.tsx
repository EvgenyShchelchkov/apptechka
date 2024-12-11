import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../shared/lib/hooks';
import styles from './ModalUpdateMedicine.module.css';
import { closeUpdateMedicineModal, selectMedicine } from '../../model/medicine.slice';
import { updateMedicineThunk } from '../../model/medicine.thunks';

export default function ModalUpdateMedicine(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const medicine = useAppSelector((state) => state.medicine.selected);
  const showUpdateMedicineModal = useAppSelector((state) => state.medicine.showUpdateMedicineModal);

  const closeHandler = (): void => {
    void dispatch(closeUpdateMedicineModal());
    void dispatch(selectMedicine(null));
  };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e): void => {
    if (!medicine) return;
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    void dispatch(updateMedicineThunk({ id: medicine.id, formData }));
    closeHandler();
  };

  return (
    <Modal open={showUpdateMedicineModal} onClose={closeHandler} aria-labelledby="add-modal-title">
      <Box className={styles.modalBox}>
        <Box className={styles.modalHeader}>
          <Typography id="add-modal-title" variant="h6" className={styles.modalTitle}>
            Обновить лекарство
          </Typography>
          <IconButton onClick={closeHandler} aria-label="close" className={styles.closeButton}>
            <CloseIcon />
          </IconButton>
        </Box>

        <form onSubmit={submitHandler}>
          <TextField
            fullWidth
            name="name"
            type="text"
            defaultValue={medicine?.name}
            label="Название лекарства"
            variant="outlined"
            margin="normal"
            required
            className={styles.textField}
          />
          <TextField
            fullWidth
            name="description"
            type="text"
            defaultValue={medicine?.description}
            label="Описание лекарства"
            variant="outlined"
            margin="normal"
            required
            className={styles.textField}
          />
          <TextField
            fullWidth
            name="code"
            type="text"
            defaultValue={medicine?.code}
            label="Код лекарства"
            variant="outlined"
            margin="normal"
            required
            className={styles.textField}
          />
          <TextField
            onChange={handleFileChange}
            fullWidth
            name="img"
            variant="outlined"
            type="file"
            margin="normal"
          />

          <FormControl sx={{ m: 1, minWidth: 150, marginLeft: 1 }}>
            <InputLabel id="demo-simple-select-autowidth-label">Предписание</InputLabel>
            <Select
              name="presciption"
              type="text"
              defaultValue={medicine?.presciption}
              label="Предписание"
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              autoWidth
            >
              <MenuItem value="По рецепту">По рецепту</MenuItem>
              <MenuItem value="Без рецепта">Без рецепта</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            name="category"
            type="text"
            defaultValue={medicine?.category}
            label="Категория лекарства"
            variant="outlined"
            margin="normal"
            required
            className={styles.textField}
          />
          {/* <TextField
            fullWidth
            name="quantity"
            type="number"
            defaultValue={medicine?.quantity}
            label="Количество таблеток"
            variant="outlined"
            margin="normal"
            required
            className={styles.textField}
          />

          <TextField
            fullWidth
            name="expiration"
            type="date"
            defaultValue={medicine?.expiration}
            label="Срок годности"
            variant="outlined"
            margin="normal"
            required
            className={styles.textField}
          /> */}
          <Button type="submit" variant="contained" className={styles.createButton}>
            Обновить
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
