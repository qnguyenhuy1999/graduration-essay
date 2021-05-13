import { ApiResponse } from 'types';
import { BaseApiService } from './axios.service';

export class ElementServiceFactory extends BaseApiService {
  removeElement(elementId: string): Promise<ApiResponse> {
    return this.delete('/api/Element/remove', {
      data: { elementId },
    });
  }

  createElement(elementId, nodeId): Promise<ApiResponse> {
    return this.post('/api/Element/create', { elementId, nodeId });
  }

  updateElement(data): Promise<ApiResponse> {
    return this.put('/api/Element/edit', data);
  }
}

export const ElementService = new ElementServiceFactory();
