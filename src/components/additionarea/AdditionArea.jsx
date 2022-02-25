import React from 'react';
import './additionarea.css';
const AddiitonArea = () => {
  return (
    <div className="area">
      <div className="addition-area">
        <button className="addition-area__button">Thêm</button>
      </div>
      <div className="popup-area">
        <h1>Thêm sản phẩm </h1>
        <label htmlFor="name">Tên sản phẩm </label>
        <input type="text" className="name" placeholder="Nhập tên" />
        <label htmlFor="category">Thể loại</label>
        <input type="text" className="category" placeholder="Nhập thể loại" />
      </div>
    </div>
  );
};

export default AddiitonArea;
