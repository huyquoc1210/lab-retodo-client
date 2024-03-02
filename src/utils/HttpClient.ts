import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import config from 'config';
import LocalStorage from './LocalStorage';

class Axios {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: config.BASE_URL,
      timeout: 10 * 60 * 1000,
      headers: { 'Content-Type': 'application/json' },
    });

    this.instance.interceptors.request.use(
      (config) => {
        const accessToken = LocalStorage.get('accessToken');
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        } else {
          delete config.headers.Authorization;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  //Read
  // public async get<T = any, R = T>(
  //     url: string,
  //     config?: AxiosRequestConfig,
  // ): Promise<R> {
  //     return this.instance.get<T, AxiosRequestConfig<R>>(
  //         url,
  //         config,
  //     ) as Promise<R>;
  // }

  public async get<T = any, R = T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return new Promise((resolve, reject) => {
      this.instance
        .get<T, AxiosResponse<R>>(url, config)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  }

  //Create
  // D là data,R là response
  public async post<R = any>(url: string): Promise<R>; //Nạp chồng hàm
  public async post<D = any, R = any>(
    url: string,
    data: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;
  public async post<D = any, R = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return new Promise((resolve, reject) => {
      this.instance
        .post<D, AxiosResponse<R>>(url, data, config)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  }

  // Update
  public async put<D = any, R = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return new Promise((resolve, reject) => {
      this.instance
        .put<D, AxiosResponse<R>>(url, data, config)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  }

  // Partial Update
  public async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.instance.patch<T>(url, data, config);
  }

  // Delete
  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.instance.delete<T>(url, config);
  }
}

const HttpClient = new Axios();
export default HttpClient;
