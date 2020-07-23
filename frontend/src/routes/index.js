import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';

import Route from './Route';

import Dashboard from '../pages/Dashboard';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/dashboard" component={Dashboard} isPrivate />
        <Route path="/register" component={SignUp} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
