import React from 'react';
import { Route, Switch } from 'react-router-dom';
import User from '../pages/User';
import Dashboard from '../pages/Dashboard';
import Book from '../pages/Book';

const Routes = () => {
  return (
    <Switch>
      <Route path="/users" component={User} />
      <Route path="/" exact component={Dashboard} />
      <Route exact path="/books" component={Book} />
    </Switch>
  );
};

export default Routes;
