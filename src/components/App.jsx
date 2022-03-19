import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Route,
  Link,
  useHistory,
  useLocation,
} from 'react-router-dom';
import Layout from '../components/layout/Layout';
import SnackBar from '../components/snackbar/SnackBar';
const App = () => {
  return (
    <BrowserRouter>
      <SnackBar />
      <Layout />
    </BrowserRouter>
  );
};

export default App;
