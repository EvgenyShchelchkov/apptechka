import { createAsyncThunk } from '@reduxjs/toolkit';
import likeService from '../api/like.service';
import { likeFormSchema } from './like.schema';

export const fetchAllLikes = createAsyncThunk('like/fetchAllLikes', () => likeService.getAll());

export const createLikeThunk = createAsyncThunk('like/createLikeThunk', (formData: FormData) => {
  const data = {
    bookId: Number(formData.get('bookId')),
  };
  const parsedData = likeFormSchema.parse(data);
  return likeService.createOne(parsedData);
});

export const deleteLikeThunk = createAsyncThunk('like/deleteLikeThunk', async (id: number) => {
  await likeService.deleteOne(id);
  return { id };
});
