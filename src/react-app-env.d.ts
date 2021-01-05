/// <reference types="react-scripts" />
import axios from 'axios';

interface BaseResponse<T> {
  code: number;
  message?: string;
  data: T;
}

declare module 'axios' {
  export interface AxiosResponse<T = any> extends Promise<BaseResponse<T>> {}
}
