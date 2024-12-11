import type { AxiosInstance } from 'axios';
import axiosInstance from '../../../shared/api/axiosInstance';
import { medicineSchema, allMedicinesSchema } from '../model/medicine.schema';
import type { MedicineFormDataType, MedicineInstanceType, MedicineType } from '../model/types';
import { medicineInstanceSchema } from '../../medkit/model/medkit.schema';

class MedicineService {
  constructor(private readonly client: AxiosInstance) {
    this.client = client;
  }

  async getAllMedicines(): Promise<MedicineType[]> {
    try {
      const response = await this.client.get('/medicines');
      return allMedicinesSchema.array().parse(response.data);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) return Promise.reject(error);
      return Promise.reject(new Error('Что-то пошло не так'));
    }
  }

  async createMedicine(formData: MedicineFormDataType): Promise<MedicineType> {
    try {
      const response = await this.client.post('/medicines', formData);
      return medicineSchema.parse(response.data);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) return Promise.reject(error);
      return Promise.reject(new Error('Что-то пошло не так'));
    }
  }

  async getOneMedicine(id: number): Promise<MedicineType> {
    try {
      const response = await this.client.get(`/medicines/${id.toString()}`);
      return medicineSchema.parse(response.data);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) return Promise.reject(error);
      return Promise.reject(new Error('Что-то пошло не так'));
    }
  }

  async updateMedicine(id: number, formData: MedicineFormDataType): Promise<MedicineType> {
    try {
      const response = await this.client.put(`/medicines/${id.toString()}`, formData);
      return medicineSchema.parse(response.data);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) return Promise.reject(error);
      return Promise.reject(new Error('Что-то пошло не так'));
    }
  }

  async updateMedicineCount(id: number): Promise<MedicineInstanceType> {
    try {
      const response = await this.client.patch(`/medicines/${id.toString()}`);
      const updatedMedicine = medicineInstanceSchema.parse(response.data.data);
      return updatedMedicine;
    } catch (error) {
      console.error('Error updating medicine:', error);
      if (error instanceof Error) return Promise.reject(error);
      return Promise.reject(new Error('Что-то пошло не так'));
    }
  }

  // eslint-disable-next-line consistent-return
  async deleteMedicine(id: number): Promise<void> {
    try {
      await this.client.delete(`/medicines/${id.toString()}`);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) return Promise.reject(error);
      return Promise.reject(new Error('Что-то пошло не так'));
    }
  }
}

export default new MedicineService(axiosInstance);
