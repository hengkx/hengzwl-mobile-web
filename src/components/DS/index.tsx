import * as React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import StudentList from './StudentList';
import Detail from './Detail';
import Edit from './Edit';

const Main: React.FC = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/student`} />
      <Route exact path={`${match.url}/student`} component={StudentList} />
      <Route exact path={`${match.url}/student/add`} component={Edit} />
      <Route exact path={`${match.url}/student/edit/:id`} component={Edit} />
      <Route exact path={`${match.url}/student/:id`} component={Detail} />
    </Switch>
  );
};

export default Main;
