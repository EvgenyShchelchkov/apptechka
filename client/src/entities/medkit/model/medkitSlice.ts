/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { MedkitState, MedkitT } from '../model/types';
import { createMedkit, deleteMedkit, loadAllMedkits, updateMedkit } from './medkit.thunk';

const initialState: MedkitState = {
  list: [],
  loading: false,
  error: null,
  showAddModal: false,
  showEditModal: false,
  editMedkit: null,
};

const medkitSlice = createSlice({
  name: 'medkits',
  initialState,
  reducers: {
    openAddModal(state) {
      state.showAddModal = true;
    },
    closeAddModal(state) {
      state.showAddModal = false;
    },
    openEditModal(state, action: PayloadAction<MedkitT>) {
      state.showEditModal = true;
      state.editMedkit = action.payload;
    },
    closeEditModal(state) {
      state.showEditModal = false;
      state.editMedkit = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadAllMedkits.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(loadAllMedkits.rejected, (state) => {
      state.error = 'Ошибка получения';
    });
    builder.addCase(createMedkit.fulfilled, (state, action) => {
      state.list.push(action.payload);
    });
    builder.addCase(createMedkit.rejected, (state) => {
      state.error = 'Ошибка получения';
    });
    builder.addCase(deleteMedkit.fulfilled, (state, action) => {
      state.list = state.list.filter((el) => el.id !== action.payload);
    });
    builder.addCase(deleteMedkit.rejected, (state) => {
      state.error = 'Ошибка получения';
    });
    builder.addCase(updateMedkit.fulfilled, (state, action) => {
      state.list = state.list.map((el) => (el.id === action.payload.id ? action.payload : el));
    });
    builder.addCase(updateMedkit.rejected, (state) => {
      state.error = 'Ошибка получения';
    });
  },
});

export const { openAddModal, closeAddModal, openEditModal, closeEditModal } = medkitSlice.actions;

export default medkitSlice.reducer;
