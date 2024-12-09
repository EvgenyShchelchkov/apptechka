import type { AxiosInstance } from 'axios';
import axiosInstance from '../../../shared/api/axiosInstance';
import type { MedkitFormDataT, MedkitT } from '../model/types';
import { allMedkitSchema, medkitSchema } from '../model/medkit.schemas';

class MedkitService {
  constructor(private readonly client: AxiosInstance) {
    this.client = client;
  }

  async getAllMedkits(): Promise<MedkitT[]> {
    try {
      const response = await this.client.get('/medkits');
      return allMedkitSchema.array().parse(response.data);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) return Promise.reject(error);
      return Promise.reject(new Error('Странная ошбика'));
    }
  }

  async getOneMedkit(id: number): Promise<MedkitT['id']> {
    try {
      await this.client.get<MedkitT>(`/medkits/${id.toString()}`);
      return id;
    } catch (error) {
      console.error(error);
      if (error instanceof Error) return Promise.reject(error);
      return Promise.reject(new Error('Странная ошбика'));
    }
  }

  async createMedkit(formData: MedkitFormDataT): Promise<MedkitT> {
    try {
      const response = await this.client.post('/medkits', formData);
      return medkitSchema.parse(response.data);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) return Promise.reject(error);
      return Promise.reject(new Error('Странная ошбика'));
    }
  }

  async updateMedkit(id: MedkitT['id'], formData: MedkitFormDataT): Promise<MedkitT> {
    try {
      const response = await this.client.put(`/medkits/${id.toString()}`, formData);
      return medkitSchema.parse(response.data);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) return Promise.reject(error);
      return Promise.reject(new Error('Странная ошбика'));
    }
  }

  async deleteMedkit(id: number): Promise<MedkitT['id']> {
    try {
      await this.client.delete<MedkitT>(`/medkits/${id.toString()}`);
      return id;
    } catch (error) {
      console.error(error);
      if (error instanceof Error) return Promise.reject(error);
      return Promise.reject(new Error('Странная ошбика'));
    }
  }
}

export default new MedkitService(axiosInstance);
