import './topnav.css';
import { React, useState, useEffect } from 'react';
import DropDown from '../dropdown/dropdown';
import notifications from '../../assets/JsonData/notification.json';
import user_menus from '../../assets/JsonData/user_menus.json';
import { Link } from 'react-router-dom';
import ThemeMenu from '../thememenu/ThemeMenu';
import { useDispatch } from 'react-redux';
import { logout } from '../../components/redux/ducks/auth';
import callAPI from '../../utils/apiCaller';

const USER_BLANK_IMAGE =
  'https://cdn-icons-png.flaticon.com/512/149/149071.png';
const displayNotificationData = (object, index) => (
  <div key={index} className="notification-item">
    <i className={object.icon}></i>
    <div>{object.content}</div>
  </div>
);

// const current_user = {
//   display_name: 'Admin',
//   image:
//     'https://thumbs.dreamstime.com/b/admin-sign-laptop-icon-stock-vector-166205404.jpg',
// };
const renderUserToggle = (user) => (
  <div className="top-nav__right-user">
    <div className="top-nav__right-user__image">
      <img src={user.image} alt="User Image" />
    </div>
  </div>
);

const TopNav = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(async () => {
    let profile = localStorage.getItem('profile');
    let access_jwt_token = JSON.parse(profile).access_jwt_token;
    await callAPI('api/account/info', 'get', null, {
      authorization: access_jwt_token,
    }).then((res) => {
      setCurrentUser({
        display_name: res.data.username,
        image: res.data.photo
          ? res.data.photo
          : 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
      });
    });
    // console.log('abcd', currentUser);
  }, []);

  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout());
    props.setToken(null);
    // history.push('/');
  };
  const displayUserData = (object, index) => {
    return (
      <Link
        key={index}
        to={object.url}
        onClick={() => {
          if (index === 3) {
            handleLogOut();
          }
        }}
      >
        <div className="notification-item">
          <i className={object.icon}></i>
          <div>{object.content}</div>
        </div>
      </Link>
    );
  };
  return (
    <div className="top-nav">
      <div className="top-nav__search">
        <input type="text" placeholder="Search here ..." />
        <i className="bx bx-search"></i>
      </div>
      <div className="top-nav__right">
        <div className="top-nav__right-item">
          {/* User and avatar section */}
          {currentUser && (
            <DropDown
              customToggle={() => renderUserToggle(currentUser)}
              dataContent={user_menus}
              renderItems={(object, index) => displayUserData(object, index)}
            />
          )}
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
