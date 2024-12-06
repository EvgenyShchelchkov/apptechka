import type { AxiosInstance } from 'axios';
import axiosInstance from '../../../shared/api/axiosInstance';
import { bookSchema } from '../model/medkit.schema';
import type { BookFormDataType, BookType } from '../model/types';

class BookService {
  constructor(private readonly client: AxiosInstance) {
    this.client = client;
  }

  async getAll(): Promise<BookType[]> {
    try {
      const response = await this.client.get('/books');
      return bookSchema.array().parse(response.data);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) return Promise.reject(error);
      return Promise.reject(new Error('Что-то пошло не так'));
    }
  }

  async createOne(formData: BookFormDataType): Promise<BookType> {
    try {
      const response = await this.client.post('/books', formData);
      return bookSchema.parse(response.data);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) return Promise.reject(error);
      return Promise.reject(new Error('Что-то пошло не так'));
    }
  }

  async getOne(id: number): Promise<BookType> {
    try {
      const response = await this.client.get(`/books/${id.toString()}`);
      return bookSchema.parse(response.data);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) return Promise.reject(error);
      return Promise.reject(new Error('Что-то пошло не так'));
    }
  }

  async updateOne(id: number, formData: BookFormDataType): Promise<BookType> {
    try {
      const response = await this.client.put(`/books/${id.toString()}`, formData);
      return bookSchema.parse(response.data);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) return Promise.reject(error);
      return Promise.reject(new Error('Что-то пошло не так'));
    }
  }

  async deleteOne(id: number): Promise<void> {
    try {
      await this.client.delete(`/books/${id.toString()}`);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) return Promise.reject(error);
      return Promise.reject(new Error('Что-то пошло не так'));
    }
  }
}

export default new BookService(axiosInstance);
