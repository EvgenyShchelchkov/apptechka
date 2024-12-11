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
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../shared/lib/hooks';
import styles from './ModalCreateMedicine.module.css';
import { closeCreateMedicineModal } from '../../model/medicine.slice';
import { createMedicineThunk } from '../../model/medicine.thunks';
import { useParams } from 'react-router-dom';

export default function ModalCreateMedicine(): React.JSX.Element {
  const [selectFile, setSelectFile] = useState(null);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const showCreateMedicineModal = useAppSelector((state) => state.medicine.showCreateMedicineModal);

  const closeHandler = (): void => {
    void dispatch(closeCreateMedicineModal());
  };

  const createHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData, '<---');
    void dispatch(createMedicineThunk({ formData, id }));
    closeHandler();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] || null;
    console.log(file, '====================================');

    setSelectFile(file);
  };
  return (
    <Modal open={showCreateMedicineModal} onClose={closeHandler} aria-labelledby="add-modal-title">
      <Box className={styles.modalBox}>
        <Box className={styles.modalHeader}>
          <Typography id="add-modal-title" variant="h6" className={styles.modalTitle}>
            Добавить лекарство
          </Typography>
          <IconButton onClick={closeHandler} aria-label="close" className={styles.closeButton}>
            <CloseIcon />
          </IconButton>
        </Box>

        <form onSubmit={createHandler} encType="multipart/form-data">
          <TextField
            fullWidth
            name="name"
            label="Название лекарства"
            variant="outlined"
            margin="normal"
            required
            className={styles.textField}
          />
          <TextField
            fullWidth
            name="description"
            label="Описание лекарства"
            variant="outlined"
            margin="normal"
            required
            className={styles.textField}
          />
          <TextField
            fullWidth
            name="code"
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
              label="Предписание"
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              autoWidth
              defaultValue=""
            >
              <MenuItem value="По рецепту">По рецепту</MenuItem>
              <MenuItem value="Без рецепта">Без рецепта</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 150, marginLeft: 1 }}>
            <InputLabel id="demo-simple-select-autowidth-label">Категория</InputLabel>
            <Select
              name="category"
              label="Категория лекарства"
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              defaultValue=""
              autoWidth
            >
              <MenuItem value="Анальгетики">Анальгетики</MenuItem>
              <MenuItem value="Антибиотики">Антибиотики</MenuItem>
              <MenuItem value="Витамины">Витамины</MenuItem>
              <MenuItem value="Кортикостероиды">Кортикостероиды</MenuItem>
              <MenuItem value="Антидепрессанты">Антидепрессанты</MenuItem>
              <MenuItem value="Противоаллергические">Противоаллергические</MenuItem>
              <MenuItem value="Сердечно-сосудистые">Сердечно-сосудистые</MenuItem>
              <MenuItem value="Гормональные">Гормональные</MenuItem>
              <MenuItem value="Противодиабетические">Противодиабетические</MenuItem>
              <MenuItem value="Противовирусные">Противовирусные</MenuItem>
              <MenuItem value="Седативные и анксиолитики">Седативные и анксиолитики</MenuItem>
              <MenuItem value="Обезболивающие">Обезболивающие</MenuItem>
              <MenuItem value="Противоспазматические">Противоспазматические</MenuItem>
              <MenuItem value="Противорвотные">Противорвотные</MenuItem>
            </Select>
          </FormControl>
          {/* <TextField
            fullWidth
            name="category"
            label="Категория лекарства"
            variant="outlined"
            margin="normal"
            required
            className={styles.textField}
          /> */}
          <TextField
            fullWidth
            name="quantity"
            type="number"
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
            label=""
            variant="outlined"
            margin="normal"
            required
            className={styles.textField}
          />

          <Button type="submit" variant="contained" className={styles.createButton}>
            Создать
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
