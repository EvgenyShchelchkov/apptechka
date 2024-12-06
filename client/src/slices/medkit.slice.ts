import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';



const initialState: MedkitState = {
  list: [],
  loading: false,
  error: null,
  showModal: false,
  isSuccessful: false,
  isEditing: false,
  editParticipant: null,
};

const participantsSlice = createSlice({
  name: 'participants',
  initialState,
  reducers: {
    openResult(state, action: PayloadAction<boolean>) {
      state.showModal = true;
      state.isSuccessful = action.payload;
    },
    closeResult(state) {
      state.showModal = false;
    },
    openEditModal(state, action: PayloadAction<Participant>) {
      state.isEditing = true;
      state.editParticipant = action.payload;
    },
    closeEditModal(state) {
      state.isEditing = false;
      state.editParticipant = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchParticipants.fulfilled, (state, action) => {
      state.list = action.payload;
    });

    builder.addCase(addParticipant.fulfilled, (state, action) => {
      state.loading = false;
      state.list.push(action.payload);
    });

    builder.addCase(deleteParticipant.fulfilled, (state, action) => {
      state.list = state.list.filter((el) => el.id !== action.payload);
    });
    builder.addCase(updateParticipant.fulfilled, (state, action) => {
      state.list = state.list.map((el) => (el.id === action.payload.id ? action.payload : el));
    });
  },
});

export const { openResult, closeResult, openEditModal, closeEditModal } = participantsSlice.actions;
export default participantsSlice.reducer;
