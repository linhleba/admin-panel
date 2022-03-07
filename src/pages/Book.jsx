import React, { useState, useEffect } from 'react';
import Table from '../components/table/Table';
import callAPI from '../utils/apiCaller';
import BookForm from '../components/Books/BookForm';
import PopUp from '../components/popup/PopUp';
import * as BookService from '../services/bookService';

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
    <td>{item.price}</td>
    {/* <td>{item.location}</td>
    <td>{item.location}</td> */}
  </tr>
);

const Book = () => {
  let [books, setBooks] = useState(undefined);
  const [openPopup, setOpenPopup] = useState(false);
  const openInPopup = (item) => {
    // setRecordForEdit(item);
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
  }, []);

  const [dataCategory, setDataCategory] = useState([]);
  var idCategory;

  const [data, setData] = useState('');
  const [reset, setReset] = useState('');

  // const handleInfo = (dataBooks, resetForm) => {
  //   setData(dataBooks);
  //   setReset(resetForm);
  // };

  // useEffect(() => {
  //   async function handleBook() {
  //     // if (books.id == 0) employeeService.insertEmployee(employee);
  //     // else employeeService.updateEmployee(employee);
  //     // Handle author and categories are not stored in the database
  //     data.categories.map(async (item) => {
  //       if (item.id === undefined) {
  //         // console.log(BookService.postCategoryAPI(item));'
  //         let id = await BookService.postCategoryAPI(item);
  //         setDataCategory(...dataCategory, id);
  //       } else {
  //         setDataCategory(...dataCategory, item.id);
  //       }
  //     });
  //     // console.log('mang categories la', dataCategory);

  //     data.authors.map((item) => {});

  //     // console.log('du lieu hien tai', data);
  //     BookService.postBookAPI(data);
  //     // reset form after update books into data
  //     reset();
  //     // format info from data
  //     // callAPI('api/book', 'GET', null).then((response) => {
  //     //   // get data from call api
  //     //   setBooks(response.data);
  //     // });
  //   }
  //   handleBook();
  // }, [data]);

  // useEffect(() => {
  //   console.log('vao trong nay', idCategory);
  //   setDataCategory(...dataCategory, idCategory);
  //   async function yes() {
  //     await BookService.postBookAPI(idCategory);
  //   }
  //   yes();
  // }, [idCategory]);

  const handleInfo = async (dataBooks, resetForm) => {
    // if (books.id == 0) employeeService.insertEmployee(employee);
    // else employeeService.updateEmployee(employee);
    // Handle author and categories are not stored in the database
    //  handle await before continuing
    await Promise.all(
      dataBooks.categories.map(async (item) => {
        if (item.id === undefined) {
          item.id = await BookService.postCategoryAPI(item);
        } else {
          // setDataCategory(...dataCategory, item.id);
        }
      }),
    );
    // console.log('mang categories la', dataCategory);

    console.log('data book author', dataBooks);
    await Promise.all(
      dataBooks.authors.map(async (item) => {
        if (item.id === undefined) {
          // console.log(BookService.postCategoryAPI(item));'
          item.id = await BookService.postAuthorAPI(item);
        }
      }),
    );

    // console.log('du lieu hien tai', dataBooks);
    await BookService.postBookAPI(dataBooks);
    // reset form after update books into data
    resetForm();
    // format info from dataBooks
    // callAPI('api/book', 'GET', null).then((response) => {
    //   // get data from call api
    //   setBooks(response.data);
    // });
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
