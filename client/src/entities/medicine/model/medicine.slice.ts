/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import {
  deleteMedicineThunk,
  createMedicineThunk,
  updateMedicineThunk,
  fetchMedicines,
} from './medicine.thunks';
import type { MedicineSliceType, MedicineType, SortableKeysType } from './types';

const initialState: MedicineSliceType = {
  items: [],
  error: null,
  showCreateMedicineModal: false,
  showUpdateMedicineModal: false,
  sort: {
    key: 'createdAt',
    order: 'desc',
  },
  isLoading: false,
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

    openCreateMedicineModal: (state) => {
      state.showCreateMedicineModal = true;
    },
    openUpdateMedicineModal: (state) => {
      state.showUpdateMedicineModal = true;
    },
    closeCreateMedicineModal: (state) => {
      state.showCreateMedicineModal = false;
    },
    closeUpdateMedicineModal: (state) => {
      state.showUpdateMedicineModal = false;
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
      .addCase(fetchMedicines.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMedicines.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchMedicines.rejected, (state) => {
        state.error = 'Ошибка получения данных!';
        state.isLoading = false;
      });
    builder
      .addCase(createMedicineThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMedicineThunk.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.isLoading = false;
      })
      .addCase(createMedicineThunk.rejected, (state) => {
        state.error = 'Ошибка добавления данных!';
        state.isLoading = false;
      });
    builder
      .addCase(updateMedicineThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMedicineThunk.fulfilled, (state, action) => {
        state.items[state.items.findIndex((el) => el.id === action.payload.id)] = action.payload;
        state.isLoading = false;
      })
      .addCase(updateMedicineThunk.rejected, (state) => {
        state.error = 'Ошибка изменения данных!';
        state.isLoading = false;
      });
    builder
      .addCase(deleteMedicineThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMedicineThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((el) => el.id !== action.payload.id);
        state.isLoading = false;
      })
      .addCase(deleteMedicineThunk.rejected, (state) => {
        state.error = 'Ошибка удаления данных!';
        state.isLoading = false;
      });
  },
});

export const { setError, clearError, setSortKey, reverseSortOrder, selectMedicine, openUpdateMedicineModal, openCreateMedicineModal,closeCreateMedicineModal, closeUpdateMedicineModal } =
  medicineSlice.actions;

export default medicineSlice.reducer;
