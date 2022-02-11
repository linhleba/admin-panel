import './topnav.css';
import React from 'react';
import DropDown from '../dropdown/dropdown';
import notifications from '../../assets/JsonData/notification.json';
import { Link } from 'react-router-dom';

const TopNav = () => {
  return (
    <div className="top-nav">
      <div className="top-nav__search">
        <input type="text" placeholder="Search here ..." />
        <i className="bx bx-search"></i>
      </div>
      <div className="top-nav__right">
        <div className="top-nav__right-item">
          {/* User and avatar section */}
          <DropDown icon={'bx bx-user'} />
        </div>
        <div className="top-nav__right-item">
          {/* Notification  */}
          <DropDown
            icon={'bx bx-bell'}
            badge={'12'}
            dataContent={notifications}
            renderFooter={() => <Link to="/">View All</Link>}
          />
        </div>
        <div className="top-nav__right-item">
          <DropDown />
          {/* theme setting */}
        </div>
      </div>
    </div>
  );
};
export default TopNav;
