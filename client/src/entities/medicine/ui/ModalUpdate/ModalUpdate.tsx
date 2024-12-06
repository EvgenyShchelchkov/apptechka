import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, IconButton, Modal, TextField, Typography } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../shared/lib/hooks';
import { selectBook } from '../../model/medicineSlice';
import { updateBookThunk } from '../../model/medicineThunks';
import styles from './ModalUpdate.module.css';

export default function ModalUpdate(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const book = useAppSelector((state) => state.book.selected);

  const closeHandler = (): void => {
    void dispatch(selectBook(null));
  };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (event): void => {
    if (!book) return;
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    void dispatch(updateBookThunk({ id: book.id, formData }));
    closeHandler();
  };

  return (
    <Modal
      open={!!book}
      onClose={closeHandler}
      aria-labelledby="edit-modal-title"
      BackdropProps={{
        style: { backgroundColor: 'transparent' },
      }}
    >
      <Box className={styles.modal}>
        <Box className={styles.header}>
          <Typography id="edit-modal-title" variant="h6" className={styles.title}>
            Изменить данные
          </Typography>
          <IconButton onClick={closeHandler} aria-label="close" className={styles.closeButton}>
            <CloseIcon />
          </IconButton>
        </Box>
        <form onSubmit={submitHandler}>
          <TextField
            fullWidth
            name="title"
            label="Название"
            variant="outlined"
            defaultValue={book?.title ?? ''}
            className={styles.textField}
          />
          <TextField
            fullWidth
            name="description"
            label="Описание"
            variant="outlined"
            multiline
            rows={4}
            defaultValue={book?.description ?? ''}
            className={styles.textField}
          />
          <TextField
            fullWidth
            name="link"
            label="Link книги"
            variant="outlined"
            defaultValue={book?.link ?? ''}
            className={styles.textField}
          />
          <TextField
            fullWidth
            name="image"
            label="URL изображения"
            variant="outlined"
            defaultValue={book?.image ?? ''}
            className={styles.textField}
          />
          <Button type="submit" variant="contained" className={styles.submitButton}>
            Сохранить
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
