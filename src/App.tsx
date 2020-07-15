import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';

moment.locale('zh-cn');

const SignIn = React.lazy(() => import('./components/Account/SignIn'));
const SignUp = React.lazy(() => import('./components/Account/SignUp'));
const Main = React.lazy(() => import('./components/Main'));
const IndexPage = React.lazy(() => import('./components/IndexPage'));
const Wechat = React.lazy(() => import('./components/Wechat'));
const AuthRedirect = React.lazy(() => import('./components/Wechat/AuthRedirect'));

const App: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/wx/:inviteId?" component={AuthRedirect} />
          <Route path="/wechat" component={Wechat} />
          <Route exact path="/account/signIn" component={SignIn} />
          <Route exact path="/account/signUp" component={SignUp} />
          <Route path="/dashboard" component={Main} />
          <Route exact path="/" component={IndexPage} />
        </Switch>
      </Suspense>
    </ConfigProvider>
  );
};

export default App;
