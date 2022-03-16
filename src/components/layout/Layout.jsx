import './layout.css';
import React, { useState, useEffect } from 'react';
import Sidebar from '../sidebar/sidebar';
import Routes from '../Routes';
import TopNav from '../topnav/TopNav';
import { BrowserRouter, Route } from 'react-router-dom';
import SnackBar from '../../components/snackbar/SnackBar';
import Login from '../../components/login/Login';
import Cookie from 'universal-cookie';

const cookie = new Cookie();
const setToken = () => {};
const getToken = () => {
  return cookie.get('access_jwt_token');
};
const Layout = () => {
  // const token = getToken();
  // console.log('token', token);
  const [token, setToken] = useState();
  // if (!token) {
  //   return <Login setToken={setToken} />;
  // }
  return (
    <BrowserRouter>
      <SnackBar />
      <Route
        render={(props) => (
          <div className="layout">
            <Sidebar {...props} />
            <div className="layout__content">
              <TopNav />
              <div className="layout_content-main">
                <Routes />
              </div>
            </div>
          </div>
        )}
      />
    </BrowserRouter>
  );
};

export default Layout;
