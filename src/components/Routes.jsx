import React from 'react';
import { Route, Routes } from 'react-router-dom';
import User from '../pages/User';
import Dashboard from '../pages/Dashboard';
import Book from '../pages/Book';

const HomeRoutes = () => {
  return (
    <Routes>
      <Route path="/users" component={User} />
      <Route path="/" exact component={Dashboard} />
      <Route exact path="/books" component={Book} />
    </Routes>
  );
};

export default HomeRoutes;
