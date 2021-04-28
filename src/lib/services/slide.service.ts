import { ApiResponse } from 'types';
import { BaseApiService } from './axios.service';

export class SlideServiceFactory extends BaseApiService {
  getSlides(): Promise<ApiResponse> {
    return this.get('/api/slide');
  }

  getSlide(slideId): Promise<ApiResponse> {
    return this.get(`/api/slide/${slideId}`);
  }

  createSlide(elementId, nodeId): Promise<ApiResponse> {
    return this.post('/api/slide/create', { elementId, nodeId });
  }
}

export const SlideService = new SlideServiceFactory();
