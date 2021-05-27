import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';

import { ApiResponse } from 'types/api';

const UNAUTHORIZED_CODE = [401, 403];

/**
 * Note that this will auto prepend our app's hostname and sets headers automatically
 */
export class BaseApiService {
  protected instance: AxiosInstance;

  constructor() {
    const token = localStorage.getItem('sp_token');
    const authorization = token ? { Authorization: `Bearer ${token}` } : null;
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_BASE_API_URL,
      headers: {
        'Content-Type': 'application/json',
        ...authorization,
      },
    });
  }

  protected post<T = any>(
    url: string,
    data,
    options?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.handleRequest(
      this.instance.post(this.formatUrl(url), data, options),
    );
  }

  protected get<T = any>(
    url: string,
    options?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.handleRequest(this.instance.get(this.formatUrl(url), options));
  }

  protected put<T = any>(
    url: string,
    data,
    options?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.handleRequest(
      this.instance.put(this.formatUrl(url), data, options),
    );
  }

  protected delete<T = any>(
    url: string,
    options?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.handleRequest(
      this.instance.delete(this.formatUrl(url), options),
    );
  }

  protected download(url: string) {
    window.open(
      process.env.REACT_APP_BASE_API_URL + this.formatUrl(url),
      'download',
    );
  }

  protected formatUrl(url: string) {
    return url;
  }

  protected redirectIfUnauthorized(statusCode) {
    return UNAUTHORIZED_CODE.includes(statusCode);
  }

  /*
    Handle generic error and transform response to app response.
    */
  private async handleRequest(
    axiosResponse: AxiosPromise<any>,
  ): Promise<ApiResponse> {
    const response = await axiosResponse;
    if (response.data.status >= 200 && response.data.status < 300) {
      return {
        data: response.data,
        originResponse: response,
      };
    } else {
      // eslint-disable-next-line no-throw-literal
      throw { data: response.data, originResponse: response };
    }
  }
}
