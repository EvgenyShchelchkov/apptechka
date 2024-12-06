/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { createBookThunk, deleteBookThunk, fetchAllBooks, updateBookThunk } from './bookThunks';
import type { BookSliceType, BookType, SortableKeysType } from './types';

const initialState: BookSliceType = {
  items: [],
  error: null,
  sort: {
    key: 'createdAt',
    order: 'desc',
  },
  selected: null,
};

export const bookSlice = createSlice({
  name: 'book',
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
    selectBook: (state, action: PayloadAction<BookType | null>) => {
      state.selected = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBooks.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchAllBooks.rejected, (state) => {
        state.error = 'Ошибка получения данных!';
      });
    builder
      .addCase(createBookThunk.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createBookThunk.rejected, (state) => {
        state.error = 'Ошибка добавления данных!';
      });
    builder
      .addCase(deleteBookThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((el) => el.id !== action.payload.id);
      })
      .addCase(deleteBookThunk.rejected, (state) => {
        state.error = 'Ошибка удаления данных!';
      });
    builder
      .addCase(updateBookThunk.fulfilled, (state, action) => {
        state.items[state.items.findIndex((el) => el.id === action.payload.id)] = action.payload;
      })
      .addCase(updateBookThunk.rejected, (state) => {
        state.error = 'Ошибка изменения данных!';
      });
  },
});

export const { setError, clearError, setSortKey, reverseSortOrder, selectBook } = bookSlice.actions;

export default bookSlice.reducer;
