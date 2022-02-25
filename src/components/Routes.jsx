import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Customer from '../pages/Customer';
import Dashboard from '../pages/Dashboard';
import Product from '../pages/Product';

const Routes = () => {
  return (
    <Switch>
      <Route path="/customers" component={Customer} />
      <Route path="/" exact component={Dashboard} />
      <Route exact path="/products" component={Product} />
    </Switch>
  );
};

export default Routes;
