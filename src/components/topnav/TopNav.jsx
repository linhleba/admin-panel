import './topnav.css';
import React from 'react';
import DropDown from '../dropdown/dropdown';
import notifications from '../../assets/JsonData/notification.json';
import user_menus from '../../assets/JsonData/user_menus.json';
import { Link } from 'react-router-dom';
import ThemeMenu from '../thememenu/ThemeMenu';

const displayNotificationData = (object, index) => (
  <div key={index} className="notification-item">
    <i className={object.icon}></i>
    <div>{object.content}</div>
  </div>
);

const displayUserData = (object, index) => (
  <Link key={index} to={object.url}>
    <div className="notification-item">
      <i className={object.icon}></i>
      <div>{object.content}</div>
    </div>
  </Link>
);

const current_user = {
  display_name: 'Admin',
  image:
    'https://thumbs.dreamstime.com/b/admin-sign-laptop-icon-stock-vector-166205404.jpg',
};
const renderUserToggle = (user) => (
  <div className="top-nav__right-user">
    <div className="top-nav__right-user__image">
      <img src={user.image} alt="User Image" />
    </div>
    <div className="top-nav__right-user__name">{user.display_name}</div>
  </div>
);

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
          <DropDown
            customToggle={() => renderUserToggle(current_user)}
            dataContent={user_menus}
            renderItems={(object, index) => displayUserData(object, index)}
          />
        </div>
        <div className="top-nav__right-item">
          {/* Notification  */}
          <DropDown
            icon={'bx bx-bell'}
            badge={'12'}
            dataContent={notifications}
            renderItems={(object, index) =>
              displayNotificationData(object, index)
            }
            renderFooter={() => <Link to="/">View All</Link>}
          />
        </div>
        <div className="top-nav__right-item">
          {/* <DropDown /> */}
          {/* theme setting */}
          <ThemeMenu />
        </div>
      </div>
    </div>
  );
};
export default TopNav;
