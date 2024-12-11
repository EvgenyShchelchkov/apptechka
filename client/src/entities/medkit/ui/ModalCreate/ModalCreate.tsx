import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, IconButton, Modal, TextField, Typography } from '@mui/material';
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
            Add a medical kit
          </Typography>
          <IconButton onClick={closeHandler} aria-label="close" className={styles.closeButton}>
            <CloseIcon />
          </IconButton>
        </Box>

        <form onSubmit={createHandler}>
          <TextField
            fullWidth
            name="name"
            label="Name of the medical kit"
            variant="outlined"
            margin="normal"
            required
            className={styles.textField}
          />
          <TextField
            fullWidth
            name="img"
            label="URL of the image"
            variant="outlined"
            margin="normal"
            defaultValue="/medkit/first_kit.jpg"
            className={styles.textField}
          />
          <Box className={styles.buttonContainer}>
            <Button type="submit" variant="contained" className={styles.createButton}>
              Create
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
