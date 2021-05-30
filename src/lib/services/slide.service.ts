import { ApiResponse } from 'types';
import { BaseApiService } from './axios.service';

export class SlideServiceFactory extends BaseApiService {
  getSlides(): Promise<ApiResponse> {
    return this.get('/api/slide');
  }

  getSlidesInTrash(): Promise<ApiResponse> {
    return this.get('/api/slide/trash');
  }

  reOpenSlide(slideId) {
    return this.put(`/api/slide/reopen`, { slideId });
  }

  getSlide(slideId): Promise<ApiResponse> {
    return this.get(`/api/slide/${slideId}`);
  }

  createSlide(name): Promise<ApiResponse> {
    return this.post('/api/slide/create', { name, accessModifier: '0' });
  }

  updateSlide(id, name): Promise<ApiResponse> {
    return this.put('/api/slide/update', { slideId: id, name });
  }

  removeSlide(slideId): Promise<ApiResponse> {
    return this.delete('/api/slide/remove', { data: { slideId } });
  }

  resetSlide(slideId): Promise<ApiResponse> {
    return this.put(`/api/slide/reset`, {
      slideId,
    });
  }
}

export const SlideService = new SlideServiceFactory();
