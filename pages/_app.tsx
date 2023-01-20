import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ConfigProvider, theme } from 'antd';
import Head from 'next/head';
import axios from 'axios';
import Router, { useRouter } from 'next/router';
import App from 'next/app';
import { SWRConfig } from 'swr';

axios.defaults.baseURL = 'https://api.privacy.hengzwl.com';

axios.interceptors.request.clear();
axios.interceptors.request.use(
  (config) => {
    config.headers.set('Authorization', localStorage.getItem('token'));
    return config;
  },
  (error) => error
);
axios.interceptors.response.clear();
axios.interceptors.response.use(
  ({ data }) => {
    if (
      data &&
      data.code === 401 &&
      window.location.pathname !== '/account/login'
    ) {
      return (window.location.pathname = '/account/login');
    }
    return data;
  },
  (error) => {
    console.log(error);
    if (
      error.response.status === 401 &&
      !window.location.pathname.startsWith('/account/login')
    ) {
      Router.push(`/account/login?redirect=${window.location.pathname}`);
      return;
    }
    return { code: 500, message: error.message };
  }
);

interface MyAppProps extends AppProps {
  isDarkMode: 'dark' | 'light';
}

export default function MyApp({
  Component,
  pageProps,
  isDarkMode,
}: MyAppProps) {
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
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}
