import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';
import logo from '../../assets/images/logo.png';
import sidebar_items from '../../assets/JsonData/sidebar_routes.json';

// const logo = '';
const SidebarItem = (props) => {
  const active = props.active ? 'active' : '';
  return (
    <div className="sidebar__item">
      <div className={`sidebar__item-inner ${active}`}>
        <i className={props.icon}></i>
        <span>{props.title}</span>
      </div>
    </div>
  );
};

const sidebar = (props) => {
  const activeItem = sidebar_items.findIndex(
    (item) => item.route === props.location.pathname,
  );
  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <img src={logo} alt="web logo" />
      </div>
      {sidebar_items.map((obj, key) => (
        <Link to={obj.route} key={key}>
          <SidebarItem
            title={obj.display_name}
            icon={obj.icon}
            active={key === activeItem}
          />
        </Link>
      ))}
    </div>
  );
};

export default sidebar;
