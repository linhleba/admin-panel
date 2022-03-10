import React, { useState, useEffect } from 'react';
import customerList from '../assets/JsonData/customers-list.json';
import callAPI from '../utils/apiCaller';
import Table from '../components/table/Table';
import Controls from '../components/controls/Controls';

const customerTableHead = [
  'Người dùng',
  'Ảnh đại diện',
  'Tên',
  'Email',
  'Loại thành viên',
  'Hành động',
];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const handleRole = (typeOfRole) => {
  if (typeOfRole === 1) {
    return 'Quản trị viên';
  } else if (typeOfRole === 0) {
    return 'Người dùng';
  }
  return 'Không có sẵn';
};

const User = () => {
  const [editingRow, setEditingRow] = useState(null);
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

  const saveChangeRole = (index, item) => {
    if (index === editingRow) {
      // console.log(item);
    }
  };

  const handleRowClick = (data) => {
    console.log(data.type);
  };

  const renderBody = (item, index) => (
    <tr key={index} onClick={() => handleRowClick(item)}>
      <td>
        {index === editingRow ? (
          <Controls.Input value={item.username} />
        ) : (
          item.username
        )}
      </td>
      <td>{}</td>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td>
        {index === editingRow ? (
          <Controls.Select options={typeRole} key={index} />
        ) : (
          handleRole(item.type)
        )}
      </td>
      <td>
        {
          <Controls.Button
            text="Chỉnh sửa"
            size="small"
            onClick={() => setEditingRow(index)}
          />
        }
        {
          <Controls.Button
            text="Lưu"
            size="small"
            onClick={() => saveChangeRole(index, item)}
          />
        }
      </td>
    </tr>
  );

  let [users, setUsers] = useState(undefined);
  // Use useEffect to set it for displaying on the table
  useEffect(() => {
    callAPI('api/account/getall', 'GET').then((response) => {
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
              {users && (
                <Table
                  limit="10"
                  headData={customerTableHead}
                  renderHead={(item, index) => renderHead(item, index)}
                  bodyData={users}
                  renderBody={(item, index) => renderBody(item, index)}
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
