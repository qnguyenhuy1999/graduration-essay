import { ApiResponse } from 'types';
import { BaseApiService } from './axios.service';

export class SlideServiceFactory extends BaseApiService {
  getSlides(): Promise<ApiResponse> {
    return this.get('/api/slide');
  }
}

export const SlideService = new SlideServiceFactory();
