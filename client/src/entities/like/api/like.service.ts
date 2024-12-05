import type { AxiosInstance } from 'axios';
import axiosInstance from '../../../shared/api/axiosInstance';
import { likeSchema } from '../model/like.schema';
import type { LikeFormDataType, LikeType } from '../model/types';

class LikeService {
  constructor(private readonly client: AxiosInstance) {
    this.client = client;
  }

  async getAll(): Promise<LikeType[]> {
    try {
      const response = await this.client.get('/likes');
      return likeSchema.array().parse(response.data);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) return Promise.reject(error);
      return Promise.reject(new Error('Что-то пошло не так'));
    }
  }

  async createOne(formData: LikeFormDataType): Promise<LikeType> {
    try {
      const response = await this.client.post(`/likes`, formData);
      return likeSchema.parse(response.data);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) return Promise.reject(error);
      return Promise.reject(new Error('Что-то пошло не так'));
    }
  }

  async deleteOne(id: number): Promise<void> {
    try {
      console.log(id);
      await this.client.delete(`/likes/${id.toString()}`);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) return Promise.reject(error);
      return Promise.reject(new Error('Что-то пошло не так'));
    }
  }
}

export default new LikeService(axiosInstance);
