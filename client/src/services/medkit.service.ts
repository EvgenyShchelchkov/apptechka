import type { AxiosInstance } from 'axios';
import type { ProductFormDataT, ProductT } from '../schemas/product.schema';
import { productSchema } from '../schemas/product.schema';
import axiosInstance from '../api/axiosInstance';

class ProductService {
  constructor(private readonly client: AxiosInstance) {
    this.client = client;
  }

  async getAll(): Promise<ProductT[]> {
    try {
      const response = await this.client.get('/products');
      return productSchema.array().parse(response.data);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) return Promise.reject(error);
      return Promise.reject(new Error('Странная ошбика'));
    }
  }

  async addProduct(formData: ProductFormDataT): Promise<ProductT> {
    try {
      const response = await this.client.post('/products', formData);
      return productSchema.parse(response.data);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) return Promise.reject(error);
      return Promise.reject(new Error('Странная ошбика'));
    }
  }

  async update(id: ProductT['id'], formData: ProductFormDataT): Promise<ProductT> {
    try {
      const response = await this.client.put(`/products/${id.toString()}`, formData);
      return productSchema.parse(response.data);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) return Promise.reject(error);
      return Promise.reject(new Error('Странная ошбика'));
    }
  }
}

export default new ProductService(axiosInstance);
