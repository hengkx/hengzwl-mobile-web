import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import { message } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.less';

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://127.0.0.1:7001';
} else {
  axios.defaults.baseURL = 'https://api.task.hengzwl.com';
}

// compatible IE11
axios.defaults.headers.get.Pragma = 'no-cache';
axios.defaults.headers.get['Cache-Control'] = 'no-cache, no-store';

axios.interceptors.request.use(
  (config) => {
    const cfg = config;
    const token = localStorage.getItem('token');
    if (token) {
      cfg.headers.Authorization = `Bearer ${token}`;
    }

    return cfg;
  },
  (error) => error,
);

axios.interceptors.response.use(
  (response) => {
    if (response.data.code === 401) {
      window.location.href = '/account/signin';
    } else if (response.data.code !== 0) {
      message.error(response.data.message);
    }
    return response.data;
  },
  (error) => error.response.data,
);

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
