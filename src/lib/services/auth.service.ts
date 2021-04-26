import { ApiResponse, LoginFormValues, RegisterFormValues } from 'types';
import { BaseApiService } from './axios.service';
import axios from 'axios';

export class AuthServiceFactory extends BaseApiService {
  getCurrentUser(): Promise<ApiResponse> {
    return this.get('/api/current-user');
  }

  login(loginInfo: LoginFormValues): Promise<ApiResponse> {
    return this.post('/api/login', {
      ...loginInfo,
    });
  }

  register(registerInfo: RegisterFormValues): Promise<ApiResponse> {
    return this.post('/api/register', {
      ...registerInfo,
    });
  }
}

export const AuthService = new AuthServiceFactory();
