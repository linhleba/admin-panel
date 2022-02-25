import React, { useState, useEffect } from 'react';
import Table from '../components/table/Table';
import callAPI from '../utils/apiCaller';
import BookForm from '../components/Books/BookForm';
import PopUp from '../components/popup/PopUp';

const productTableHead = [
  'Id',
  'Tên sách',
  'Thể loại',
  'Tác giả',
  'Số lượng',
  'Giá',
];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.name}</td>
    <td>{item.category.map((item) => item.name)}</td>
    <td>{item.author.map((item) => item.name)}</td>
    <td>{item.quantity}</td>
    <td>{item.price}</td>
    {/* <td>{item.location}</td>
    <td>{item.location}</td> */}
  </tr>
);

const Product = () => {
  let [books, setBooks] = useState(undefined);
  const [openPopup, setOpenPopup] = useState(false);
  const openInPopup = (item) => {
    // setRecordForEdit(item);
    setOpenPopup(true);
  };
  useEffect(() => {
    // let mounted = true;
    callAPI('api/book', 'GET', null).then((response) => {
      // get data from call api
      setBooks(response.data);
    });
    // return () => (mounted = false);
  }, []);
  // const apiCaller = callAPI('api/book', 'GET', null).then((response) => {
  //   // get data from call api
  //   setBooks(response.data);
  //   console.log('abc', books);
  // });
  // const { addOrEdit, recordForEdit } = props;
  return (
    <div>
      <h2 className="page-header">Sản phẩm</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              {
                <div className="table__button">
                  <button
                    className="table__button-add"
                    onClick={() => {
                      setOpenPopup(true);
                    }}
                  >
                    Thêm
                  </button>
                </div>
              }

              <PopUp title="Thêm sản phẩm" openPopup={openPopup}>
                <BookForm />
              </PopUp>
              {books && (
                <Table
                  limit="5"
                  headData={productTableHead}
                  renderHead={(item, index) => renderHead(item, index)}
                  bodyData={books}
                  renderBody={(item, index) => renderBody(item, index)}
                  activeButton="true"
                />
              )}

              {/* <ul>
                  {books.map((item) => (
                    <li key={item.id}>{item.name}</li>
                  ))}
                </ul> */}

              {/* <Table
                  limit="5"
                  headData={productTableHead}
                  renderHead={(item, index) => renderHead(item, index)}
                  bodyData={books}
                  renderBody={(item, index) => renderBody(item, index)}
                /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
