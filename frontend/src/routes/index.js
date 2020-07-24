import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Students from '../pages/Students';
import Plans from '../pages/Plans';
import Enrollments from '../pages/Enrollments';
import HelpOrders from '../pages/HelpOrders';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/register" component={SignUp} />

        <Route path="/dashboard" component={Dashboard} isPrivate />
        <Route path="/students" component={Students} isPrivate />
        <Route path="/plans" component={Plans} isPrivate />
        <Route path="/enrollments" component={Enrollments} isPrivate />
        <Route path="/help_orders" component={HelpOrders} isPrivate />
        
        <Route path="/" component={() => (<h1>404</h1>)} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
