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

  interface ItemEnchant {
    id: number;
    value: number;
    description: string;
  }

  /**
   * @deprecated
   */
  interface Item {
    id: number;
    name: string;
    point: number;
    enchants: ItemEnchant[];
    count: number;
    icon: string;
    iconIndex: number;
    score: number;
  }

  export interface AccountInfo {
    uLv: number;
    id: string;
    createdAt: number;
    updatedAt: number;
    name: string;
    classId: number;
    armorScore: number;
    accessoryScore: number;
    gemScore: number;
    runeScore: number;
    bangleScore: number;
    broochScore: number;
    badgeScore: number;
    haloScore: number;
    crystalScore: number;
    ringScore: number;
    guardScore: number;
    medalScore: number;
    petScore: number;
    collectScore: number;
    collectCount: number;
    collectSetCount: number;
    collects: Collect[];
    collectStatuses: number[];
    packages: any[];
    titles: any[];
    gems: Item[];
    /**
     * 防具
     */
    armors: Item[];
    /**
     * 首饰
     */
    accessories: Item[];
    /**
     * 宠物
     */
    pets: Item[];
    /**
     * 守护
     */
    guards: Item[];
    /**
     * 勋章
     */
    medals: Item[];
    /**
     * 光环
     */
    halos: Item[];
    /**
     * 胸针
     */
    brooches: Item[];
    /**
     * 结晶
     */
    crystals: Item[];
    /**
     * 手镯
     */
    bangles: Item[];
    /**
     * 徽章
     */
    badges: Item[];
    /**
     * 符文
     */
    runes: Item[];
    /**
     * 特效戒指
     */
    rings: Item[];
    /**
     * 军帽
     */
    caps: Item[];
    /**
     * 武器
     */
    weapons: Item[];
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
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<BaseResponse<T>>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<BaseResponse<T>>;
    head<T = any>(url: string, config?: AxiosRequestConfig): Promise<BaseResponse<T>>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<BaseResponse<T>>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<BaseResponse<T>>;
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<BaseResponse<T>>;
  }
}
