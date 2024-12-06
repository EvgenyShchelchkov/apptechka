import { createAsyncThunk } from '@reduxjs/toolkit';
import bookService from '../api/medkit.service';
import { bookFormSchema } from './medkit.schema';

// First, create the thunk
export const fetchAllBooks = createAsyncThunk('book/fetchAllBooks', () => bookService.getAll());

export const createBookThunk = createAsyncThunk('book/createBookThunk', (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const parsedData = bookFormSchema.parse(data);
  return bookService.createOne(parsedData);
});

export const updateBookThunk = createAsyncThunk(
  'book/updateBookThunk',
  ({ id, formData }: { id: number; formData: FormData }) => {
    const data = Object.fromEntries(formData);
    const parsedData = bookFormSchema.parse(data);
    return bookService.updateOne(id, parsedData);
  },
);

export const deleteBookThunk = createAsyncThunk('book/deleteBookThunk', async (id: number) => {
  await bookService.deleteOne(id);
  return { id };
});
