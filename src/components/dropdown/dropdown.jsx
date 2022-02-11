import React from 'react';
import './dropdown.css';

const displayData = (dataContent) => {
  return dataContent.map((object, index) => (
    <div key={index} className="notification-item">
      <i className={object.icon}></i>
      <div>{object.content}</div>
    </div>
  ));
};

const dropdown = (props) => {
  return (
    <div className="dropdown">
      <button className="dropdown__toggle">
        {props.icon ? <i className={props.icon}></i> : ''}
        {props.badge ? (
          <span className="dropdown__badge">{props.badge}</span>
        ) : (
          ''
        )}
      </button>
      <div className="dropdown__content">
        {props.dataContent ? displayData(props.dataContent) : ''}
        {props.renderFooter ? (
          <div className="dropdown__content-footer">{props.renderFooter()}</div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default dropdown;
