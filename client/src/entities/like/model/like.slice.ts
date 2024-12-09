/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { createLikeThunk, deleteLikeThunk, fetchAllLikes } from './like.thunks';
import type { LikeSliceType, LikeType } from './types';

const initialState: LikeSliceType = {
  items: [],
  error: null,
  selected: null,
};

export const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    selectLike: (state, action: PayloadAction<LikeType | null>) => {
      state.selected = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllLikes.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchAllLikes.rejected, (state) => {
        state.error = 'Ошибка получения данных!';
      });
    builder
      .addCase(createLikeThunk.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createLikeThunk.rejected, (state) => {
        state.error = 'Ошибка добавления данных!';
      });
    builder
      .addCase(deleteLikeThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((el) => el.id !== action.payload.id);
      })
      .addCase(deleteLikeThunk.rejected, (state) => {
        state.error = 'Ошибка удаления данных!';
      });
  },
});

export const { setError, clearError, selectLike } = likeSlice.actions;

export default likeSlice.reducer;
