import './layout.css';
import React, { useState, useEffect } from 'react';
import Sidebar from '../sidebar/sidebar';
import Routes from '../Routes';
import TopNav from '../topnav/TopNav';
import {
  BrowserRouter,
  Route,
  Link,
  useHistory,
  useLocation,
} from 'react-router-dom';
import SnackBar from '../../components/snackbar/SnackBar';
import Login from '../../components/login/Login';
import Cookie from 'universal-cookie';
import useToken from '../../components/hooks/useToken';
import { useDispatch } from 'react-redux';
import { logout } from '../../components/redux/ducks/auth';
import decode from 'jwt-decode';

const Layout = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [token, setToken] = useState(user?.access_jwt_token);
  const dispatch = useDispatch();

  const location = useLocation();
  const history = useHistory();

  // const { token, setToken } = useToken();

  const LogOut = () => {
    console.log('vo nay');
    dispatch(logout());
    history.push('/');
    setUser(null);
    return <Login />;
  };

  useEffect(() => {
    // console.log(location);
    // const token = user?.access_jwt_token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) LogOut();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location.pathname]);

  if (!token) {
    // console.log('vao lai nay');
    return <Login setToken={setToken} />;
  }
  return (
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
  );
};

export default Layout;
