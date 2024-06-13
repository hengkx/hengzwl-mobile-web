import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { ConfigProvider, theme } from 'antd';
import Head from 'next/head';
import axios from 'axios';
import App from 'next/app';
import { SWRConfig } from 'swr';
import { StyleProvider } from '@ant-design/cssinjs';
import Router, { useRouter } from 'next/navigation';

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:5001';
} else {
  axios.defaults.baseURL = 'https://api.chd.hengzwl.com';
}

// axios.defaults.baseURL = 'https://api.chd.hengzwl.com';

export const device = JSON.stringify({ version: '1.10.72', bundleId: 'web' });

axios.interceptors.request.clear();
axios.interceptors.request.use(
  (config) => {
    config.headers.set('device', device);
    config.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return config;
  },
  (error) => error
);
axios.interceptors.response.clear();
axios.interceptors.response.use(
  ({ data }) => {
    if (data && data.code === 401 && window.location.pathname !== '/login') {
      return (window.location.pathname = '/login');
    }
    return data;
  },
  (error) => {
    console.log(error);
    if (error.response.status === 401 && !window.location.pathname.startsWith('/login')) {
      // Router.push(`/account/login?redirect=${window.location.pathname}`);
      return;
    }
    return { code: 500, message: error.message };
  }
);

interface MyAppProps extends AppProps {
  isDarkMode: 'dark' | 'light';
}

export default function MyApp({ Component, pageProps, isDarkMode }: MyAppProps) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>恒记APP</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="恒记APP下载,彩虹岛,数据查询,装备查询,彩虹岛升级材料,装备对比"
        />
        <meta
          name="description"
          content="恒记是一款提升工作和生活中效率的 APP。彩虹岛等一些游戏装备、怪物数据等一些数据查询，支持装备对比，订阅官网更新通知，游戏开服通知。同时还支持记账、事件提醒、已经智能Twitter文件下载等。"
        />
        <meta property="og:title" content="恒记APP-游戏·记账·事件·文件" />
        <meta
          property="og:description"
          content="恒记是一款提升工作和生活中效率的 APP。彩虹岛等一些游戏装备、怪物数据等一些数据查询，支持装备对比，订阅官网更新通知，游戏开服通知。同时还支持记账、事件提醒、已经智能Twitter文件下载等。"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="referrer" content="no-referrer-when-downgrade" />
      </Head>
      <SWRConfig
        value={{
          fetcher: (resource, init) => axios(resource, init),
        }}
      >
        <StyleProvider hashPriority="high">
          <Component {...pageProps} />
        </StyleProvider>
      </SWRConfig>
    </>
  );
}
