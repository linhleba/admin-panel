import React, { useState, useEffect } from 'react';
import Table from '../components/table/Table';
import callAPI from '../utils/apiCaller';
import BookForm from '../components/Books/BookForm';
import PopUp from '../components/popup/PopUp';
import * as BookService from '../services/bookService';
import FormatPrice from '../utils/formatPrice/formatPrice';
import { useDispatch } from 'react-redux';
import { setSnackbar } from '../components/redux/ducks/snackbar';
import Controls from '../components/controls/Controls';
import './book.css';

const bookTableHead = [
  '',
  'Tên sách',
  // 'Thể loại',
  // 'Tác giả',
  'Số lượng',
  'Giá',
  'Hành động',
];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const handleSplitDisplaying = (item, index, arr) => {
  // if (arr.length - 1 === index) {
  //   return item.name;
  // }
  // return `${item.name}, `;
  const randomColor = ['black', 'green', 'yellow', 'blue'];
  const rdNum = Math.random(0, 3);
  console.log(rdNum);
  // console.log(Math.random(0, 3));
  return (
    <Controls.Button
      style={{ backgroundColor: randomColor[Math.floor(rdNum)] }}
      text={item.name}
      size="small"
      onClick={() => {}}
    />
  );
};

const Book = () => {
  const dispatch = useDispatch();
  let [books, setBooks] = useState(undefined);
  const [openPopup, setOpenPopup] = useState(false);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const openInPopup = (item) => {
    setOpenPopup(true);
  };

  const [textDisplayPopup, setTextDisplayPopup] = useState(null);
  const [dataBookView, setDataBookView] = useState(null);

  const handleViewDetail = (item) => {
    console.log(item);
    setOpenPopup(true);
    setTextDisplayPopup('Chi tiết sản phẩm');
    setDataBookView(item);
  };

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>
        {item.image_url ? (
          <img src={item.image_url} alt="Album Art" className="userImage" />
        ) : (
          <img
            src="https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png"
            alt="Album Art"
            className="userImage"
          />
        )}
      </td>
      <td>{item.name}</td>
      {/* <td>
      {item.category.map((item, index, arr) =>
        handleSplitDisplaying(item, index, arr),
      )}
    </td>
    <td>
      {item.author.map((item, index, arr) =>
        handleSplitDisplaying(item, index, arr),
      )}
    </td> */}
      <td>{item.quantity}</td>
      <td>{item.price.toLocaleString()}</td>
      <td>
        {
          <Controls.Button
            text="Chi tiết"
            size="small"
            onClick={() => handleViewDetail(item)}
          />
        }
      </td>
    </tr>
  );

  // Use useEffect to set it for displaying on the table
  useEffect(() => {
    // let mounted = true;
    callAPI('api/book', 'GET', null).then((response) => {
      // get data from call api
      setBooks(response.data);
    });
    // return () => (mounted = false);
  }, []);

  const handleInfo = async (dataBooks, resetForm, isEditForm) => {
    // if (books.id == 0) employeeService.insertEmployee(employee);
    // else employeeService.updateEmployee(employee);
    // Handle author and categories are not stored in the database
    //  handle await before continuing
    if (!isEditForm) {
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
      if (result == 200) {
        // const dispatch = useDispatch();
        // handle to display snackbar
        // console.log('ket qua tra ve ben trong', result);
        dispatch(setSnackbar(true, 'success', 'Cập nhật sách thành công!'));
      } else {
        dispatch(setSnackbar(true, 'error', 'Đã có lỗi xảy ra!'));
      }
      resetForm();
      // reset form after update books into data
    } else {
      const bookId = isEditForm.id;
      const result = await BookService.updateBookAPI(dataBooks, bookId);
      if (result == 200) {
        // const dispatch = useDispatch();
        // handle to display snackbar
        // console.log('ket qua tra ve ben trong', result);
        dispatch(setSnackbar(true, 'success', 'Cập nhật sách thành công!'));
      } else {
        dispatch(setSnackbar(true, 'error', 'Đã có lỗi xảy ra!'));
      }
      // payload = {
      //   name: dataBooks.name,
      //   description: dataBooks.description,
      //   price: dataBooks.price,
      //   quantity: dataBooks.quantity,
      //   author_id: req.body.author_id,
      //   category_id: req.body.category_id,
      //   image_url: req.body.image_url,
      // };
      // await callAPI('api/book/${dataBooks.id}', 'put', null).then((res))
      // console.log('edit form');
    }
    await callAPI('api/book', 'GET', null).then((response) => {
      // get data from call api
      console.log('response la', response);
      setBooks(response.data);
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
                      setTextDisplayPopup('Thêm sản phẩm');
                      setOpenPopup(true);
                      setDataBookView(null);
                    }}
                  >
                    Thêm
                  </button>
                </div>
              }

              <PopUp
                title={textDisplayPopup}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
              >
                <BookForm handleInfo={handleInfo} dataBooks={dataBookView} />
              </PopUp>

              {books && (
                <Table
                  limit="10"
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
