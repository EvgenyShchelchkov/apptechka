import type { AxiosInstance } from 'axios';
import axiosInstance from '../../../shared/api/axiosInstance';
import { favoriteSchema } from '../model/favorites.schema';
import type { FavoriteFormDataType, FavoriteType } from '../model/types';

class FavoriteService {
  constructor(private readonly client: AxiosInstance) {
    this.client = client;
  }

  async getAll(): Promise<FavoriteType[]> {
    try {
      const response = await this.client.get('/favorites');
      return favoriteSchema.array().parse(response.data);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) return Promise.reject(error);
      return Promise.reject(new Error('Что-то пошло не так'));
    }
  }

  async createOne(formData: FavoriteFormDataType): Promise<FavoriteType> {
    try {
      const response = await this.client.post(`/favorites`, formData);
      return favoriteSchema.parse(response.data);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) return Promise.reject(error);
      return Promise.reject(new Error('Что-то пошло не так'));
    }
  }

  async deleteOne(id: number): Promise<void> {
    try {
      await this.client.delete(`/favorites/${id.toString()}`);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) return Promise.reject(error);
      return Promise.reject(new Error('Что-то пошло не так'));
    }
  }
}

export default new FavoriteService(axiosInstance);
