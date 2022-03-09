import React, { useState, useEffect } from 'react';
import Table from '../components/table/Table';
import callAPI from '../utils/apiCaller';
import BookForm from '../components/Books/BookForm';
import PopUp from '../components/popup/PopUp';
import * as BookService from '../services/bookService';
import FormatPrice from '../utils/formatPrice/formatPrice';
import { useDispatch } from 'react-redux';
import { setSnackbar } from '../components/redux/ducks/snackbar';
import './book.css';

const bookTableHead = [
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
    <td>{item.category.map((item) => `${item.name} `)}</td>
    <td>{item.author.map((item) => `${item.name} `)}</td>
    <td>{item.quantity}</td>
    <td>{FormatPrice(item.price)}</td>
  </tr>
);

const Book = () => {
  const dispatch = useDispatch();
  let [books, setBooks] = useState(undefined);
  const [openPopup, setOpenPopup] = useState(false);
  const openInPopup = (item) => {
    setOpenPopup(true);
  };
  // Use useEffect to set it for displaying on the table
  useEffect(() => {
    // let mounted = true;
    callAPI('api/book', 'GET', null).then((response) => {
      // get data from call api
      setBooks(response.data);
    });
    // return () => (mounted = false);
  }, [books]);

  const handleInfo = async (dataBooks, resetForm) => {
    // if (books.id == 0) employeeService.insertEmployee(employee);
    // else employeeService.updateEmployee(employee);
    // Handle author and categories are not stored in the database
    //  handle await before continuing
    await Promise.all(
      dataBooks.categories.map(async (item) => {
        if (item.id === undefined) {
          item.id = await BookService.postCategoryAPI(item);
        }
      }),
    );

    await Promise.all(
      dataBooks.authors.map(async (item) => {
        if (item.id === undefined) {
          item.id = await BookService.postAuthorAPI(item);
        }
      }),
    );

    const result = await BookService.postBookAPI(dataBooks);
    console.log('ket qua tra ve', result);
    if (result == 200) {
      // const dispatch = useDispatch();
      // handle to display snackbar
      // console.log('ket qua tra ve ben trong', result);
      dispatch(setSnackbar(true, 'success', 'Cập nhật sách thành công!'));
    } else {
      dispatch(setSnackbar(true, 'error', 'Đã có lỗi xảy ra!'));
    }
    // reset form after update books into data
    resetForm();
    await callAPI('api/book', 'GET', null).then((response) => {
      // get data from call api
      console.log('response la', response);
      setBooks(response.data.data);
    });
  };
  return (
    <div>
      <h2 className="page-header">Quản lí sách</h2>
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

              <PopUp
                title="Thêm sản phẩm"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
              >
                <BookForm handleInfo={handleInfo} />
              </PopUp>
              {books && (
                <Table
                  limit="5"
                  headData={bookTableHead}
                  renderHead={(item, index) => renderHead(item, index)}
                  bodyData={books}
                  renderBody={(item, index) => renderBody(item, index)}
                  activeButton="true"
                  isSearch="true"
                />
              )}

              {/* <ul>
                  {books.map((item) => (
                    <li key={item.id}>{item.name}</li>
                  ))}
                </ul> */}

              {/* <Table
                  limit="5"
                  headData={bookTableHead}
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

export default Book;
