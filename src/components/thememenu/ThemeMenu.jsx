import './thememenu.css';
import React, { useRef, useState, useEffect } from 'react';

const mode_settings = [
  {
    id: 'light',
    name: 'Sáng',
    background: 'light-background',
    class: 'theme-mode-light',
  },
  {
    id: 'dark',
    name: 'Tối',
    background: 'dark-background',
    class: 'theme-mode-dark',
  },
];

const color_settings = [
  {
    id: 'blue',
    name: 'Xanh dương',
    background: 'blue-color',
    class: 'theme-color-blue',
  },
  {
    id: 'red',
    name: 'Đỏ',
    background: 'red-color',
    class: 'theme-color-red',
  },
  {
    id: 'cyan',
    name: 'Xanh mạ',
    background: 'cyan-color',
    class: 'theme-color-cyan',
  },
  {
    id: 'green',
    name: 'Xanh lá cây',
    background: 'green-color',
    class: 'theme-color-green',
  },
  {
    id: 'orange',
    name: 'Cam',
    background: 'orange-color',
    class: 'theme-color-orange',
  },
];
const clickOutsideRef = (content_ref, toggle_ref) => {
  document.addEventListener('mousedown', (e) => {
    // user click toggle
    if (toggle_ref.current && toggle_ref.current.contains(e.target)) {
      content_ref.current.classList.toggle('active');
    } else {
      // user click outside toggle and content
      if (content_ref.current && !content_ref.current.contains(e.target)) {
        content_ref.current.classList.remove('active');
      }
    }
  });
};

const ThemeMenu = () => {
  const menu_ref = useRef(null);
  const menu_toggle_ref = useRef(null);
  clickOutsideRef(menu_ref, menu_toggle_ref);
  const setActiveMenu = () => menu_ref.current.classList.add('active');
  const closeMenu = () => menu_ref.current.classList.remove('active');

  const [curMode, setCurMode] = useState('light');
  const [curColor, setCurColor] = useState('blue');
  const setMode = (mode) => {
    setCurMode(mode.id);
    localStorage.setItem('themeMode', mode.class);
  };
  const setColor = (color) => {
    setCurColor(color.id);
    localStorage.setItem('colorMode', color.class);
  };
  // Update useEffect set theme local storage

  return (
    <div>
      <button
        ref={menu_toggle_ref}
        className="dropdown__toggle"
        onClick={() => setActiveMenu()}
      >
        <i className="bx bx-palette"></i>
      </button>
      <div ref={menu_ref} className="theme-menu">
        <h4>Chủ đề</h4>
        <button className="theme-menu__close" onClick={() => closeMenu()}>
          <i className="bx bx-x"></i>
        </button>
        <div className="theme-menu__select">
          <span>Chọn chế độ</span>
          <ul className="mode-list">
            {mode_settings.map((item, index) => (
              <li key={index} onClick={() => setMode(item)}>
                <div
                  className={`mode-list__color ${item.background} ${
                    curMode === item.id ? 'active' : ''
                  }`}
                >
                  <i className="bx bx-check"></i>
                </div>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="theme-menu__select">
          <span>Choose color</span>
          <ul className="mode-list">
            {color_settings.map((item, index) => (
              <li key={index} onClick={() => setColor(item)}>
                <div
                  className={`mode-list__color ${item.background} ${
                    item.background
                  } ${curColor === item.id ? 'active' : ''}`}
                >
                  <i className="bx bx-check"></i>
                </div>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ThemeMenu;
