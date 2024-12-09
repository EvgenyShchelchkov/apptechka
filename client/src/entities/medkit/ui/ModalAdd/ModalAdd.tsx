import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, IconButton, Modal, TextField, Typography } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../shared/lib/hooks';
import { closeAddModal } from '../../model/medkitSlice';
import { createMedkit } from '../../model/medkit.thunk';

export default function ModalAdd(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const showAddModal = useAppSelector((state) => state.medkit.showAddModal);

  const closeHandler = (): void => {
    dispatch(closeAddModal());
  };

  const createHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    void dispatch(createMedkit(formData));
    closeHandler();
  };

  return (
    <Modal open={showAddModal} onClose={closeHandler} aria-labelledby="add-modal-title">
      <Box
        sx={{
          padding: 2,
          backgroundColor: '#fff',
          borderRadius: '8px',
          width: '400px',
          margin: 'auto',
          mt: '10%',
        }}
      >
        {/* Заголовок и кнопка закрытия */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography id="add-modal-title" variant="h6" sx={{ color: 'red' }}>
            Добавить аптечку
          </Typography>
          <IconButton onClick={closeHandler} aria-label="close" sx={{ color: 'red' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Форма */}
        <form onSubmit={createHandler}>
          <TextField
            fullWidth
            name="name"
            label="Название аптечки"
            variant="outlined"
            margin="normal"
            required
            sx={{
              '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'red' } },
              '& .MuiInputLabel-root': { color: 'red' },
            }}
          />
          <TextField
            fullWidth
            name="img"
            label="URL изображения"
            variant="outlined"
            margin="normal"
            defaultValue="https://cdn-icons-png.flaticon.com/512/4710/4710113.png"
            sx={{
              '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'red' } },
              '& .MuiInputLabel-root': { color: 'red' },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              color: '#fff',
              backgroundColor: 'red',
              textTransform: 'none',
              padding: '6px 16px', // Стандартный отступ
              minWidth: 'auto', // Размер под текст
              '&:hover': { backgroundColor: 'darkred' },
            }}
          >
            Создать
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
