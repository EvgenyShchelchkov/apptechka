/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { createFavoriteThunk, deleteFavoriteThunk, fetchFavorites } from './favorites.thunks';
import type { FavoriteSliceType, FavoriteType } from './types';

const initialState: FavoriteSliceType = {
  items: [],
  error: null,
  selected: null,
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    selectLike: (state, action: PayloadAction<FavoriteType | null>) => {
      state.selected = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state) => {
        state.error = 'Ошибка получения данных!';
      });
    builder
      .addCase(createFavoriteThunk.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createFavoriteThunk.rejected, (state) => {
        state.error = 'Ошибка добавления данных!';
      });
    builder
      .addCase(deleteFavoriteThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((el) => el.id !== action.payload.id);
      })
      .addCase(deleteFavoriteThunk.rejected, (state) => {
        state.error = 'Ошибка удаления данных!';
      });
  },
});

export const { setError, clearError, selectLike } = favoriteSlice.actions;

export default favoriteSlice.reducer;
