import { ApiResponse } from 'types';
import { BaseApiService } from './axios.service';

export class SlideServiceFactory extends BaseApiService {
  getSlides(): Promise<ApiResponse> {
    return this.get('/api/slide');
  }

  getSlide(slideId): Promise<ApiResponse> {
    return this.get(`/api/slide/${slideId}`);
  }

  createSlide(name): Promise<ApiResponse> {
    return this.post('/api/slide/create', { name });
  }

  resetSlide(slideId): Promise<ApiResponse> {
    return this.put(`/api/slide/reset`, {
      slideId,
    });
  }
}

export const SlideService = new SlideServiceFactory();
