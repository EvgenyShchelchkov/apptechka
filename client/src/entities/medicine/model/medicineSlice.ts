/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import {
  createMedicineThunk,
  deleteMedicineThunk,
  fetchMedicines,
  updateMedicineThunk,
} from './medicineThunks';
import type { MedicineSliceType, MedicineType, SortableKeysType } from './types';

const initialState: MedicineSliceType = {
  items: [],
  error: null,
  sort: {
    key: 'createdAt',
    order: 'desc',
  },
  selected: null,
};

export const medicineSlice = createSlice({
  name: 'medicine',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setSortKey: (state, action: PayloadAction<SortableKeysType>) => {
      state.sort.key = action.payload;
    },
    reverseSortOrder: (state) => {
      state.sort.order = state.sort.order === 'asc' ? 'desc' : 'asc';
    },
    selectMedicine: (state, action: PayloadAction<MedicineType | null>) => {
      state.selected = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchMedicines.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchMedicines.rejected, (state) => {
        state.error = 'Ошибка получения данных!';
      });
    builder
      .addCase(createMedicineThunk.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createMedicineThunk.rejected, (state) => {
        state.error = 'Ошибка добавления данных!';
      });
    builder
      .addCase(updateMedicineThunk.fulfilled, (state, action) => {
        state.items[state.items.findIndex((el) => el.id === action.payload.id)] = action.payload;
      })
      .addCase(updateMedicineThunk.rejected, (state) => {
        state.error = 'Ошибка изменения данных!';
      });
    builder
      .addCase(deleteMedicineThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((el) => el.id !== action.payload.id);
      })
      .addCase(deleteMedicineThunk.rejected, (state) => {
        state.error = 'Ошибка удаления данных!';
      });
  },
});

export const { setError, clearError, setSortKey, reverseSortOrder, selectMedicine } =
  medicineSlice.actions;

export default medicineSlice.reducer;
