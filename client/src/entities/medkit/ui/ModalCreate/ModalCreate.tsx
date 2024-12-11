import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  NativeSelect,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../shared/lib/hooks';
import { closeCreateModal } from '../../model/medkit.slice';
import { createMedkitThunk } from '../../model/medkit.thunk';
import styles from './ModalCreate.module.css';

export default function ModalCreate(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const showCreateModal = useAppSelector((state) => state.medkit.showCreateModal);

  const closeHandler = (): void => {
    void dispatch(closeCreateModal());
  };

  const createHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    void dispatch(createMedkitThunk(formData));
    closeHandler();
  };

  return (
    <Modal open={showCreateModal} onClose={closeHandler} aria-labelledby="add-modal-title">
      <Box className={styles.modalBox}>
        <Box className={styles.modalHeader}>
          <Typography id="add-modal-title" variant="h6" className={styles.modalTitle}>
            Добавить аптечку
          </Typography>
          <IconButton onClick={closeHandler} aria-label="close" className={styles.closeButton}>
            <CloseIcon />
          </IconButton>
        </Box>

        <form onSubmit={createHandler}>
          <TextField
            fullWidth
            name="name"
            label="Название аптечки"
            variant="outlined"
            margin="normal"
            required
            className={styles.textField}
          />

          <FormControl sx={{ m: 1, minWidth: 150, marginLeft: 1 }}>
            <InputLabel id="demo-simple-select-autowidth-label">Цвет аптечки</InputLabel>
            <Select
              name="img"
              label="Цвет аптечки"
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              autoWidth
            >
              <MenuItem value="/medkit/first_kit.jpg">Красная</MenuItem>
              <MenuItem value="/medkit/second_kit.jpg">Желтая</MenuItem>
              <MenuItem value="/medkit/third_kit.jpg">Зеленая</MenuItem>
            </Select>
          </FormControl>

          <Box className={styles.buttonContainer}>
            <Button type="submit" variant="contained" className={styles.createButton}>
              Создать
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
