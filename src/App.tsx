import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';

moment.locale('zh-cn');

const Main = React.lazy(() => import('./components/main'));
const Wechat = React.lazy(() => import('./components/wechat'));
const AuthRedirect = React.lazy(() => import('./components/wechat/AuthRedirect'));

const App: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/wx/:inviteId?" component={AuthRedirect} />
          <Route path="/wechat" component={Wechat} />
          <Route path="/" component={Main} />
        </Switch>
      </Suspense>
    </ConfigProvider>
  );
};

export default App;
