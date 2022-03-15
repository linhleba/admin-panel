import React from 'react';
import { Route, Switch } from 'react-router-dom';
import User from '../pages/User';
import Dashboard from '../pages/Dashboard';
import Book from '../pages/Book';
import Profile from '../pages/Profile';
import Password from '../pages/Password';

const Routes = () => {
  return (
    <Switch>
      <Route path="/users" component={User} />
      <Route path="/" exact component={Dashboard} />
      <Route exact path="/books" component={Book} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/password" component={Password} />
    </Switch>
  );
};

export default Routes;
