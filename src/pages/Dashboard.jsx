import React from 'react';
import statusCardData from '../assets/JsonData/status-card-data.json';
import StatusCard from '../components/statuscard/StatusCard';
const Dashboard = () => {
  return (
    <div>
      <h2 className="page-header">Dashboard</h2>
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
          <div className="card full-height">{/* charts */}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
