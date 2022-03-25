import React, { useState, useEffect } from 'react';
import customerList from '../assets/JsonData/customers-list.json';
import callAPI from '../utils/apiCaller';
import Table from '../components/table/Table';
import Controls from '../components/controls/Controls';
import { useDispatch } from 'react-redux';
import { setSnackbar } from '../components/redux/ducks/snackbar';
import './user.css';
import BookForm from '../components/forms/Books/BookForm';
import PopUp from '../components/popup/PopUp';

const customerTableHead = [
  'Người dùng',
  'Ảnh đại diện',
  'Tên',
  'Email',
  'Vai trò',
  'Hành động',
];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const handleRole = (typeOfRole) => {
  if (typeOfRole === 1) {
    return 'Admin';
  } else if (typeOfRole === 0) {
    return 'Người dùng';
  }
  return 'Không có sẵn';
};

const User = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const openInPopup = (item) => {
    setOpenPopup(true);
  };
  const dispatch = useDispatch();
  const [editingRow, setEditingRow] = useState(null);
  // useState in here for storing 2 values (username & role)
  const [userName, setUserName] = useState(null);
  const [role, setRole] = useState(null);
  const [users, setUsers] = useState(undefined);

  const typeRole = [
    {
      id: 1,
      title: 'Admin',
    },
    {
      id: 0,
      title: 'Người dùng',
    },
  ];

  // handle setData and display username on <td> </td>
  const handleUserName = (data) => {
    setUserName(data);
    return data;
  };

  const saveChangeRole = async (index, item) => {
    if (index === editingRow) {
      // handle axios with username and value
      let profile = localStorage.getItem('profile');
      let access_jwt_token = JSON.parse(profile).access_jwt_token;
      await callAPI(
        `api/account/setRole/${userName}`,
        'put',
        {
          type: role,
        },
        { authorization: access_jwt_token },
      ).then((response) => {
        console.log(response);
        if (response.status == 200) {
          // const dispatch = useDispatch();
          // handle to display snackbar
          // console.log('ket qua tra ve ben trong', result);
          dispatch(setSnackbar(true, 'success', 'Cập nhật thành công!'));
        } else {
          dispatch(setSnackbar(true, 'error', 'Đã có lỗi xảy ra!'));
        }
      });
      // call again api to update data
      await callAPI('api/account/getall', 'GET').then((response) => {
        // get data from call api
        setUsers(response.data);

        // console.log('hehe', response);
      });
      // console.log(users);
      setEditingRow(null);
    } else {
      dispatch(setSnackbar(true, 'error', 'Vui lòng chỉnh sửa trước khi lưu'));
    }
  };

  const handleRowClick = (data) => {
    console.log(data.type);
  };

  const handleInfo = async (dataBooks, resetForm) => {
    console.log('update');
  };
  const renderBody = (item, index) => (
    <tr key={index} onClick={() => handleRowClick(item)}>
      <td>
        {index === editingRow ? handleUserName(item.username) : item.username}
      </td>
      <td>
        {item.photo ? (
          <img src={item.photo} alt="Album Art" className="userImage" />
        ) : (
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="Album Art"
            className="userImage"
          />
        )}
      </td>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td>
        {index === editingRow ? (
          <Controls.Select
            options={typeRole}
            value={role}
            key={index}
            onChange={(e) => {
              const { value } = e.target;
              setRole(value);
              console.log(value);
            }}
          />
        ) : (
          handleRole(item.type)
        )}
      </td>
      <td>
        {
          <Controls.Button
            text="Chỉnh sửa"
            size="small"
            onClick={() => {
              setEditingRow(index);
              setUserName(item.username);
              setRole(item.type);
            }}
          />
        }
        {
          <Controls.Button
            type="submit"
            text="Lưu"
            size="small"
            onClick={() => saveChangeRole(index, item)}
          />
        }
      </td>
    </tr>
  );

  // Use useEffect to set it for displaying on the table
  useEffect(() => {
    let profile = localStorage.getItem('profile');
    let access_jwt_token = JSON.parse(profile).access_jwt_token;
    callAPI('api/account/getall', 'GET', null, {
      authorization: access_jwt_token,
    }).then((response) => {
      // get data from call api
      setUsers(response.data);
      // console.log('hehe', response);
    });
  }, []);
  return (
    <div>
      <h2 className="page-header">Người dùng</h2>
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
              {users && (
                <Table
                  limit="10"
                  headData={customerTableHead}
                  renderHead={(item, index) => renderHead(item, index)}
                  bodyData={users}
                  renderBody={(item, index) => renderBody(item, index)}
                  // isSearch="true"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
