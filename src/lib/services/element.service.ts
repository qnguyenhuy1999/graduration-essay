import { ApiResponse } from 'types';
import { BaseApiService } from './axios.service';

export class ElementServiceFactory extends BaseApiService {
  removeElement(elementId: string): Promise<ApiResponse> {
    return this.delete('/api/element/remove', {
      data: { elementId },
    });
  }
}

export const ElementService = new ElementServiceFactory();
