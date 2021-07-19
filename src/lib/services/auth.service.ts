import { ApiResponse, LoginFormValues, RegisterFormValues } from 'types';
import { BaseApiService } from './axios.service';

export class AuthServiceFactory extends BaseApiService {
  getCurrentUser(): Promise<ApiResponse> {
    return this.get('/api/user/current-user');
  }

  login(loginInfo: LoginFormValues): Promise<ApiResponse> {
    return this.post(
      '/api/login',
      {
        ...loginInfo,
      },
      {
        headers: { Authorization: null },
      },
    );
  }

  register(registerInfo: RegisterFormValues): Promise<ApiResponse> {
    return this.post('/api/register', {
      ...registerInfo,
    });
  }
}

export const AuthService = new AuthServiceFactory();
