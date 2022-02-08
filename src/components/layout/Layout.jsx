import './layout.css';
import React from 'react';
import Sidebar from '../sidebar/sidebar';
import Routes from '../Routes';
import { BrowserRouter, Route } from 'react-router-dom';

const Layout = () => {
  return (
    <BrowserRouter>
      <Route
        render={(props) => (
          <div className="layout">
            <Sidebar {...props} />
            <div className="layout__content">
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
