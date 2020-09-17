import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import StudentsList from '../pages/Students/List';
import StudentsForm from '../pages/Students/Form';
import PlansList from '../pages/Plans/List';
import PlansForm from '../pages/Plans/Form';
import EnrollmentsList from '../pages/Enrollments/List';
import EnrollmentsForm from '../pages/Enrollments/Form';
import HelpOrders from '../pages/HelpOrders/List';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/dashboard" component={Dashboard} isPrivate />

        <Route path="/students" exact component={StudentsList} isPrivate />
        <Route path="/students/new" exact component={StudentsForm} isPrivate />
        <Route path="/students/:id/edit" exact component={StudentsForm} isPrivate />

        <Route path="/plans" exact component={PlansList} isPrivate />
        <Route path="/plans/new" component={PlansForm} isPrivate />

        <Route path="/enrollments" exact component={EnrollmentsList} isPrivate />
        <Route path="/enrollments/new" component={EnrollmentsForm} isPrivate />

        <Route path="/help_orders" exact component={HelpOrders} isPrivate />

        <Route path="/" component={() => (<h1>404</h1>)} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
