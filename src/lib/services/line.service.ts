import { ApiResponse } from 'types';
import { BaseApiService } from './axios.service';

export class LineServiceFactory extends BaseApiService {
  removeLine(linkId: string): Promise<ApiResponse> {
    return this.delete('/api/link/remove', { data: { linkId } });
  }
}

export const LineService = new LineServiceFactory();
