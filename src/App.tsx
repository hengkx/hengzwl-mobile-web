import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './components/main';
import Wechat from './components/wechat';
import Invite from './components/wechat/Invite';
import InviteResult from './components/wechat/InviteResult';

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/wechat/invite/result" component={InviteResult} />
      <Route exact path="/wechat/invite/:id" component={Invite} />
      <Route path="/wechat" component={Wechat} />
      <Route path="/" component={Main} />
    </Switch>
  );
};

export default App;
