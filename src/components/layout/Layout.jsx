import './layout.css';
import React, { useState, useEffect } from 'react';
import Sidebar from '../sidebar/sidebar';
import Routes from '../Routes';
import TopNav from '../topnav/TopNav';
import { BrowserRouter, Route } from 'react-router-dom';
import SnackBar from '../../components/snackbar/SnackBar';
import Login from '../../components/login/Login';
import Cookie from 'universal-cookie';
import useToken from '../../components/hooks/useToken';
const Layout = () => {
  // const {token, setToken } = useState(null);
  const { token, setToken } = useToken();

  if (!token) {
    console.log('vao lai nay');
    return <Login setToken={setToken} />;
  }
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
