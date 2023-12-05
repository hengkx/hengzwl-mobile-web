import axios from 'axios';

global {
  interface BaseResponse<T> {
    code: number;
    data: T;
    msg: string;
  }

  namespace JSX {
    interface IntrinsicElements {
      'ff-onboarding-widget': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > &
        any;
    }
  }

  interface Window {
    frankieFinancial: any;
  }

  export interface AccountInfo {
    id: string;
    createdAt: number;
    updatedAt: number;
    deletedAt: null;
    collectCount: number;
    collectSetCount: number;
    collects: Collect[];
    collectStatuses: number[];
    packages: any[];
  }

  export interface Collect {
    id: number;
    mobs: Mob[];
    name: string;
    active: boolean;
    totalCount: number;
    activeCount: number;
  }

  export interface Mob {
    id: number;
    name: string;
    active: boolean;
  }
}

declare module 'axios' {
  export interface AxiosResponse<T = any> extends Promise<BaseResponse<T>> {}
  export interface AxiosInstance {
    get<T = any>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<BaseResponse<T>>;
    delete<T = any>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<BaseResponse<T>>;
    head<T = any>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<BaseResponse<T>>;
    post<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<BaseResponse<T>>;
    put<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<BaseResponse<T>>;
    patch<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<BaseResponse<T>>;
  }
}
