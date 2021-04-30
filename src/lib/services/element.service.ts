import { ApiResponse } from 'types';
import { BaseApiService } from './axios.service';

export class ElementServiceFactory extends BaseApiService {
  removeElement(elementId: string): Promise<ApiResponse> {
    return this.delete('/api/element/remove', {
      data: { elementId },
    });
  }

  createElement(elementId, nodeId): Promise<ApiResponse> {
    return this.post('/api/element/create', { elementId, nodeId });
  }
}

export const ElementService = new ElementServiceFactory();
