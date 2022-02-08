import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Customer from '../pages/Customer';
import Dashboard from '../pages/Dashboard';

const Routes = () => {
  return (
    <Switch>
      <Route path="/customer" component={Customer} />
      <Route path="/" exact component={Dashboard} />
    </Switch>
  );
};

export default Routes;
