import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../shared/lib/hooks';
import { closeUpdateModal, selectMedkit } from '../../model/medkit.slice';
import { updateMedkitThunk } from '../../model/medkit.thunk';
import styles from './ModalUpdate.module.css';

export default function ModalUpdate(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const medkit = useAppSelector((state) => state.medkit.selected);

  const closeHandler = (): void => {
    void dispatch(closeUpdateModal());
    void dispatch(selectMedkit(null));
  };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e): void => {
    if (!medkit) return;
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    void dispatch(updateMedkitThunk({ id: medkit.id, formData }));
    closeHandler();
  };

  return (
    <Modal open={!!medkit} onClose={closeHandler} aria-labelledby="edit-modal-title">
      <Box className={styles.modalBox}>
        <Box className={styles.modalHeader}>
          <Typography id="edit-modal-title" variant="h6" className={styles.modalTitle}>
            Update a medical kit
          </Typography>
          <IconButton onClick={closeHandler} aria-label="close" className={styles.closeButton}>
            <CloseIcon />
          </IconButton>
        </Box>

        <form onSubmit={submitHandler}>
          <TextField
            fullWidth
            name="name"
            label="Name of the medical kit"
            variant="outlined"
            margin="normal"
            required
            defaultValue={medkit?.name}
            className={styles.textField}
          />
<<<<<<< HEAD
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
=======
          <TextField
            fullWidth
            name="img"
            label="URL of the image"
            variant="outlined"
            margin="normal"
            defaultValue={medkit?.img}
            className={styles.textField}
          />
>>>>>>> FavoritePage
          <Box className={styles.buttonContainer}>
            <Button type="submit" variant="contained" className={styles.updateButton}>
              Update
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
