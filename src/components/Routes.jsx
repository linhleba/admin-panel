import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Customer from '../pages/Customer';
import Dashboard from '../pages/Dashboard';
import Book from '../pages/Book';

const Routes = () => {
  return (
    <Switch>
      <Route path="/customers" component={Customer} />
      <Route path="/" exact component={Dashboard} />
      <Route exact path="/books" component={Book} />
    </Switch>
  );
};

export default Routes;
