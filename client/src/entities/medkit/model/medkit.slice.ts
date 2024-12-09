/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import {
  createMedkitThunk,
  deleteMedkitThunk,
  fetchMedkits,
  fetchOneMedkit,
  updateMedkitThunk,
} from './medkit.thunk';
import type { MedkitSliceType, MedkitType } from './types';

const initialState: MedkitSliceType = {
  items: [],
  error: null,
  showModal: false,
  isLoading: false,
  selected: null,
};

export const medkitSlice = createSlice({
  name: 'medkit',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    openModal: (state) => {
      state.showModal = true;
    },
    closeModal: (state) => {
      state.showModal = false;
    },
    selectMedkit: (state, action: PayloadAction<MedkitType | null>) => {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedkits.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMedkits.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchMedkits.rejected, (state) => {
        state.error = 'Ошибка получения данных!';
      });
    builder
      .addCase(fetchOneMedkit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOneMedkit.fulfilled, (state, action) => {
        state.selected = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchOneMedkit.rejected, (state) => {
        state.error = 'Ошибка получения данных!';
      });
    builder
      .addCase(createMedkitThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMedkitThunk.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.isLoading = false;
      })
      .addCase(createMedkitThunk.rejected, (state) => {
        state.error = 'Ошибка добавления данных!';
      });
    builder
      .addCase(updateMedkitThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMedkitThunk.fulfilled, (state, action) => {
        state.items = state.items.map((el) => (el.id === action.payload.id ? action.payload : el));
        state.isLoading = false;
      })
      .addCase(updateMedkitThunk.rejected, (state) => {
        state.error = 'Ошибка изменения данных!';
      });
    builder
      .addCase(deleteMedkitThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMedkitThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((el) => el.id !== action.payload.id);
        state.isLoading = false;
      })
      .addCase(deleteMedkitThunk.rejected, (state) => {
        state.error = 'Ошибка удаления данных!';
      });
  },
});

export const { setError, clearError, selectMedkit } = medkitSlice.actions;

export default medkitSlice.reducer;
