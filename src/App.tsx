import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './components/main';
import Wechat from './components/wechat';
import AuthRedirect from './components/wechat/AuthRedirect';

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/wx/:inviteId?" component={AuthRedirect} />
      <Route path="/wechat" component={Wechat} />
      <Route path="/" component={Main} />
    </Switch>
  );
};

export default App;
