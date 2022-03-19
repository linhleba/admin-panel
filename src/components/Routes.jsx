import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import User from '../pages/User';
import Dashboard from '../pages/Dashboard';
import Book from '../pages/Book';
import Profile from '../pages/Profile';
import Password from '../pages/Password';
import Login from '../components/login/Login';

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
