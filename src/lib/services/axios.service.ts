import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';

import { ApiError, ApiResponse } from 'types/api';

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
    {...authorization},
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
    try {
      const response = await axiosResponse;
      if (response.data.status >= 200 && response.data.status < 300) {
        return {
          data: response.data,
          originResponse: response,
        };
      } else {
        throw response;
      }
    } catch (error) {
      let apiError: ApiError = {
        name: 'NETWORK_ERROR',
        originError: null,
        code: 'UNKNOWN_ERROR',
        error_message: 'There is something wrong in server!',
        extras: [],
        errors: [],
        message: '',
      };
      // apiError.originError =  error;
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const data = error.response.data;
        if (data) {
          if (this.redirectIfUnauthorized(data.status_code)) {
            window.location.replace('/login');
            localStorage.removeItem('sp_token');
          } else {
            //TODO: define again
            apiError.errors = data.errors;
            apiError.message =
              data.message || 'There is something wrong in server!';
            apiError.code = data.code;
            apiError.extras = data.extras;
          }
        }
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        apiError.code = 'NO_RESPONSE';
        apiError.message = 'Unable to connect to server';
      } else {
        // Something happened in setting up the request that triggered an Error
        apiError.code = 'RUNTIME_ERROR';
        apiError.message = error.message;
      }
      throw apiError;
    }
  }
}
