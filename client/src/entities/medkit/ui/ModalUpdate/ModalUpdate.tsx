import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../shared/lib/hooks';
import { updateMedkit } from '../../model/medkit.thunk';
import { closeEditModal } from '../../model/medkitSlice';
import { Modal, Box, Typography, IconButton, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function ModalUpdate(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const showEditModal = useAppSelector((state) => state.medkit.showEditModal);
  const medkit = useAppSelector((state) => state.medkit.editMedkit);

  console.log('showEditModal:', showEditModal);
  console.log('medkit in ModalUpdate:', medkit);

  const closeHandler = (): void => {
    void dispatch(closeEditModal());
  };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (event): void => {
    if (!medkit) return;
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log('Редактируемая аптечка перед отправкой:', medkit);
    void dispatch(updateMedkit({ id: medkit.id, formData }));
    closeHandler();
  };

  return (
    <Modal open={showEditModal} onClose={closeHandler} aria-labelledby="edit-modal-title">
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
          <Typography id="edit-modal-title" variant="h6" sx={{ color: 'red' }}>
            Изменить аптечку
          </Typography>
          <IconButton onClick={closeHandler} aria-label="close" sx={{ color: 'red' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Форма */}
        <form onSubmit={submitHandler}>
          <TextField
            fullWidth
            name="name"
            label="Название аптечки"
            variant="outlined"
            margin="normal"
            required
            defaultValue={medkit?.name} // Подставляем значение для редактируемого медкита
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
            defaultValue={medkit?.img} // Подставляем значение для редактируемого медкита
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
            Обновить
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
