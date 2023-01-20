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
