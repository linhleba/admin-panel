import React, { useState, useEffect } from 'react';
// import statusCardData from '../assets/JsonData/status-card-data.json';
import StatusCard from '../components/statuscard/StatusCard';
import Chart from 'react-apexcharts';
import { Link } from 'react-router-dom';
import Table from '../components/table/Table';
import Badge from '../components/badge/Badge';
import callAPI from '../utils/apiCaller';
import moment from 'moment';

const chartOptions = {
  series: [
    {
      name: 'Online Shop',
      data: [30, 40, 55, 40, 35, 25, 32, 60, 90],
    },
    {
      name: 'Store customer',
      data: [40, 32, 26, 41, 53, 45, 32, 22, 31],
    },
  ],
  options: {
    color: ['#6ab04c', '#2980b9'],
    chart: {
      background: 'transparent',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
      ],
    },
    legend: {
      position: 'top',
    },
    grid: {
      show: false,
    },
  },
};

const orderStatus = {
  1: 'primary',
  0: 'warning',
  'Đã giao': 'success',
  'Hoàn tiền': 'danger',
};

const renderOrderHead = (item, index) => <th key={index}>{item}</th>;

const renderOrderBody = (item, index) => {
  let status = null;
  if (item.status == 0) {
    status = 'Chưa giao';
  } else {
    status = 'Đã giao';
  }
  return (
    <tr key={index}>
      <td>{moment(item.created_at).format('DD/MM/YYYY')}</td>
      <td>{item.username}</td>
      <td>{item.price_total.toLocaleString()}</td>
      <td>
        <Badge type={orderStatus[item.status]} content={status} />
      </td>
    </tr>
  );
};

const Dashboard = () => {
  const [statusCardData, setStatusCardData] = useState(null);

  useEffect(async () => {
    let allData;
    await callAPI('api/transaction/orders-total').then((res) => {
      allData = [
        {
          icon: 'bx bx-shopping-bag',
          count: res.data[0].orders_total,
          title: 'Đơn hàng',
        },
      ];
    });
    await callAPI('api/transaction/revenue-total').then((res) => {
      allData = [
        ...allData,
        {
          icon: 'bx bx-dollar-circle',
          count: res.data[0].revenue_total.toLocaleString(),
          title: 'Lợi nhuận',
        },
      ];
    });
    await callAPI('api/account/users-total').then((res) => {
      allData = [
        ...allData,
        {
          icon: 'bx bx-user',
          count: res.data[0].users_total,
          title: 'Khách hàng',
        },
      ];
    });
    await callAPI('api/book/total').then((res) => {
      allData = [
        ...allData,
        {
          icon: 'bx bx-book',
          count: res.data[0].books_total,
          title: 'Cuốn sách',
        },
      ];
    });
    setStatusCardData(allData);
  }, []);

  const [dataLatestOrders, setDataLatestOrders] = useState(null);
  useEffect(async () => {
    await callAPI('api/transaction/latest').then((res) => {
      setDataLatestOrders(res.data);
    });
  }, []);

  const latestOrders = {
    header: ['Ngày', 'Tài khoản', 'Tổng tiền', 'Trạng thái'],
    body: dataLatestOrders,
  };

  const [dataTopUsers, setDataTopUsers] = useState(null);
  useEffect(async () => {
    await callAPI('api/transaction/topuser', 'get').then((res) => {
      setDataTopUsers(res.data);
    });
  }, []);

  const topCustomers = {
    head: ['Tài khoản', 'Tổng đơn', 'Tổng chi tiêu'],
    body: dataTopUsers,
  };

  const renderCustomerHead = (item, index) => <th key={index}>{item}</th>;

  const renderCustomerBody = (item, index) => (
    <tr key={index}>
      <td>{item.username}</td>
      <td>{item.orders_total}</td>
      <td>{item.spending_total.toLocaleString()}</td>
    </tr>
  );

  return (
    <div>
      <h2 className="page-header">Trang chủ</h2>
      <div className="col">
        <div className="row">
          {statusCardData &&
            statusCardData.map((object, index) => (
              <div key={index} className="col-6 card-item">
                {/* {object.title} */}
                <StatusCard
                  icon={object.icon}
                  count={object.count}
                  title={object.title}
                />
              </div>
            ))}
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <div className="card">
            <div className="card-header">
              <h3>Khách hàng tiềm năng</h3>
            </div>
            <div className="card-body">
              {dataTopUsers && (
                <Table
                  limit="5"
                  headData={topCustomers.head}
                  bodyData={topCustomers.body}
                  renderHead={(obj, index) => renderCustomerHead(obj, index)}
                  renderBody={(obj, index) => renderCustomerBody(obj, index)}
                />
              )}
            </div>
            {/* <div className="card-footer">
              <Link to="/">View all</Link>
            </div> */}
          </div>
        </div>
        <div className="col-6">
          <div className="card">
            <div className="card-header">
              <h3>Giao dịch mới nhất</h3>
            </div>
            <div className="card-body">
              {dataLatestOrders && (
                <Table
                  limit="5"
                  headData={latestOrders.header}
                  bodyData={latestOrders.body}
                  renderHead={(obj, index) => renderOrderHead(obj, index)}
                  renderBody={(obj, index) => renderOrderBody(obj, index)}
                />
              )}
            </div>
            <div className="card-footer">
              <Link to="/orders">Xem tất cả</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
