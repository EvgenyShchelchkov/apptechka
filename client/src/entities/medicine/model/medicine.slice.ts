/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import {
  deleteMedicineThunk,
  createMedicineThunk,
  fetchMedicines,
  updateMedicineQuantity,
  updateMedicineThunk,
} from './medicine.thunks';
import type { MedicineSliceType, MedicineType, SortableKeysType } from './types';

const initialState: MedicineSliceType = {
  items: [],
  error: null,
  showCreateMedicineModal: false,
  showUpdateMedicineModal: false,
  sort: {
    key: 'expiration',
    order: 'desc',
  },
  isLoading: false,
  selected: null,
  medicineCount: null,
  filter: '',
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
      if (state.sort.key !== action.payload) {
        state.sort.order = 'desc';
      }
    },
    reverseSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sort.order = action.payload;
    },
    selectMedicine: (state, action: PayloadAction<MedicineType | null>) => {
      state.selected = action.payload;
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    clearFilter: (state) => {
      state.filter = '';
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
      .addCase(updateMedicineQuantity.fulfilled, (state, action) => {
        console.log('Action payload:', action.payload);
        const { id, quantity } = action.payload;
        state.items.forEach((medicine) => {
          const medicineInstance = medicine.MedicineInstances?.find((el) => el.id === id);
          if (medicineInstance) {
            medicineInstance.quantity = quantity;
          }
        });
      })
      .addCase(updateMedicineQuantity.rejected, (state) => {
        state.error = 'Ошибка изменения данных!';
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

export const { setError, clearError, setSortKey, reverseSortOrder, selectMedicine } =
  medicineSlice.actions;

export default medicineSlice.reducer;
