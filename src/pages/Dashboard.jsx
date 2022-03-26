import React, { useState, useEffect } from 'react';
import statusCardData from '../assets/JsonData/status-card-data.json';
import StatusCard from '../components/statuscard/StatusCard';
import Chart from 'react-apexcharts';
import { Link } from 'react-router-dom';
import Table from '../components/table/Table';
import Badge from '../components/badge/Badge';
import callAPI from '../utils/apiCaller';

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

const latestOrders = {
  header: ['order id', 'user', 'total price', 'date', 'status'],
  body: [
    {
      id: '#OD1711',
      user: 'john doe',
      date: '17 Jun 2021',
      price: '$900',
      status: 'shipping',
    },
    {
      id: '#OD1712',
      user: 'frank iva',
      date: '1 Jun 2021',
      price: '$400',
      status: 'paid',
    },
    {
      id: '#OD1713',
      user: 'anthony baker',
      date: '27 Jun 2021',
      price: '$200',
      status: 'pending',
    },
    {
      id: '#OD1712',
      user: 'frank iva',
      date: '1 Jun 2021',
      price: '$400',
      status: 'paid',
    },
    {
      id: '#OD1713',
      user: 'anthony baker',
      date: '27 Jun 2021',
      price: '$200',
      status: 'refund',
    },
  ],
};

const orderStatus = {
  shipping: 'primary',
  pending: 'warning',
  paid: 'success',
  refund: 'danger',
};

const renderOrderHead = (item, index) => <th key={index}>{item}</th>;

const renderOrderBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.user}</td>
    <td>{item.price}</td>
    <td>{item.date}</td>
    <td>
      <Badge type={orderStatus[item.status]} content={item.status} />
    </td>
  </tr>
);

const Dashboard = () => {
  const [dataTopUsers, setDataTopUsers] = useState(null);
  useEffect(async () => {
    await callAPI('api/transaction/topuser', 'get').then((res) => {
      setDataTopUsers(res.data);
      console.log('data user', res.data);
      console.log('data user', dataTopUsers);
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
      <div className="row">
        <div className="col-6">
          <div className="row">
            {statusCardData.map((object, index) => (
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
        <div className="col-6">
          <div className="card full-height">
            {
              /* charts */

              <Chart
                options={chartOptions.options}
                series={chartOptions.series}
                type="line"
                height="100%"
              />
            }
          </div>
        </div>
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
              <Table
                limit="5"
                headData={latestOrders.header}
                bodyData={latestOrders.body}
                renderHead={(obj, index) => renderOrderHead(obj, index)}
                renderBody={(obj, index) => renderOrderBody(obj, index)}
              />
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
