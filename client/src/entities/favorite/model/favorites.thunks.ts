import { createAsyncThunk } from '@reduxjs/toolkit';
import favoritesService from '../api/favorites.service';
import { favoriteFormSchema } from './favorites.schema';

export const fetchFavorites = createAsyncThunk('favorite/fetchFavorites', () =>
  favoritesService.getAll(),
);

export const createFavoriteThunk = createAsyncThunk(
  'favorite/createFavorite',
  (formData: FormData) => {
    const data = {
      medicine_instance_id: Number(formData.get('medicine_instance_id')),
    };
    const parsedData = favoriteFormSchema.parse(data);
    return favoritesService.createOne(parsedData);
  },
);

export const deleteFavoriteThunk = createAsyncThunk(
  'favorite/deleteFavorite',
  async (id: number) => {
    await favoritesService.deleteOne(id);
    return { id };
  },
);
