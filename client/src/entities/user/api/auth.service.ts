import type { AxiosInstance } from 'axios';
import axiosInstance from '../../../shared/api/axiosInstance';
import { authResponseSchema } from '../model/auth.schema';
import type { authResponseType, signinFromType, signupFromType } from '../model/types';

class AuthService {
  constructor(private readonly client: AxiosInstance) {
    this.client = client;
  }

  async signin(data: signinFromType): Promise<authResponseType> {
    const response = await this.client.post('/auth/signin', data);
    return authResponseSchema.parse(response.data);
  }

  async signup(data: signupFromType): Promise<authResponseType> {
    const response = await this.client.post('/auth/signup', data);
    return authResponseSchema.parse(response.data);
  }

  async signout(): Promise<void> {
    await this.client.get('/auth/signout');
  }

  async refresh(): Promise<authResponseType> {
    const response = await this.client.get('/token/refresh');
    return authResponseSchema.parse(response.data);
  }
}

export default new AuthService(axiosInstance);
