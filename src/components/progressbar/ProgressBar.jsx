import React, { useState, useEffect } from 'react';
import './progressbar.css';

const ProgressBar = (props) => {
  const { done } = props;
  const [style, setStyle] = React.useState({});

  useEffect(() => {
    setTimeout(() => {
      const newStyle = {
        opacity: 1,
        width: `${done}%`,
      };

      setStyle(newStyle);
    }, 200);
  }, [done, style]);

  return (
    <div className="progress">
      <div className="progress-done" style={style}>
        {done == 0 ? `` : `${done}%`}
      </div>
    </div>
  );
};

export default ProgressBar;
