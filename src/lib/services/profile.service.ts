import { ApiResponse } from 'types';
import { BaseApiService } from './axios.service';
import { UpdatePasswordPayload, UpdateProfileFormValues } from 'types/profile';

export class ProfileServiceFactory extends BaseApiService {
  updatePassword(data: UpdatePasswordPayload): Promise<ApiResponse> {
    return this.put('/api/user/change-password', data);
  }

  changeProfileInfo(data: UpdateProfileFormValues): Promise<ApiResponse> {
    return this.put('/api/user/edit', data);
  }
}

export const ProfileService = new ProfileServiceFactory();
