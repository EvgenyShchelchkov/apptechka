import type { AxiosInstance } from 'axios';
import axiosInstance from '../../../shared/api/axiosInstance';
import { medkitSchema } from '../model/medkit.schema';
import type { MedkitFormDataType, MedkitType } from '../model/types';

class MedkitService {
  constructor(private readonly client: AxiosInstance) {
    this.client = client;
  }

  async getAllMedkits(): Promise<MedkitType[]> {
    try {
      const response = await this.client.get('/medkits');
      return medkitSchema.array().parse(response.data);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) return Promise.reject(error);
      return Promise.reject(new Error('Что-то пошло не так'));
    }
  }

  async getOneMedkit(id: number): Promise<MedkitType> {
    try {
      const response = await this.client.get<MedkitType>(`/medkits/${id.toString()}`);
      return medkitSchema.parse(response.data);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) return Promise.reject(error);
      return Promise.reject(new Error('Что-то пошло не так'));
    }
  }

  async createMedkit(formData: MedkitFormDataType): Promise<MedkitType> {
    try {
      const response = await this.client.post('/medkits', formData);
      return medkitSchema.parse(response.data);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) return Promise.reject(error);
      return Promise.reject(new Error('Что-то пошло не так'));
    }
  }

  async updateMedkit(id: MedkitType['id'], formData: MedkitFormDataType): Promise<MedkitType> {
    try {
      const response = await this.client.put(`/medkits/${id.toString()}`, formData);
      return medkitSchema.parse(response.data);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) return Promise.reject(error);
      return Promise.reject(new Error('Что-то пошло не так'));
    }
  }

  async deleteMedkit(id: number): Promise<void> {
    try {
      await this.client.delete(`/medkits/${id.toString()}`);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) return Promise.reject(error);
      return Promise.reject(new Error('Что-то пошло не так'));
    }
  }
}

export default new MedkitService(axiosInstance);