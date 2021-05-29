import { ApiResponse } from 'types';
import { BaseApiService } from './axios.service';
import { CreateLine } from 'types/line';

export class LineServiceFactory extends BaseApiService {
  removeLine(linkId: string): Promise<ApiResponse> {
    return this.delete('/api/link/remove', { data: { linkId } });
  }

  createLine(data: CreateLine): Promise<ApiResponse> {
    return this.post('/api/link/create', { ...data });
  }
}

export const LineService = new LineServiceFactory();
