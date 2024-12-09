import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, IconButton, Modal, TextField, Typography } from '@mui/material';
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
            Изменить аптечку
          </Typography>
          <IconButton onClick={closeHandler} aria-label="close" className={styles.closeButton}>
            <CloseIcon />
          </IconButton>
        </Box>

        <form onSubmit={submitHandler}>
          <TextField
            fullWidth
            name="name"
            label="Название аптечки"
            variant="outlined"
            margin="normal"
            required
            defaultValue={medkit?.name}
            className={styles.textField}
          />
          <TextField
            fullWidth
            name="img"
            label="URL изображения"
            variant="outlined"
            margin="normal"
            defaultValue={medkit?.img}
            className={styles.textField}
          />
          <Button type="submit" variant="contained" className={styles.updateButton}>
            Обновить
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
