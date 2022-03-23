import React, { useState, useEffect } from 'react';
import './table.css';
import AdditionArea from '../additionarea/AdditionArea';
import PopUp from '../popup/PopUp';
import Control from '../controls/Controls';
import Pagination from '@mui/material/Pagination';

const Table = (props) => {
  /* 
    Searching in table
    1. Check if isSearch is valid or not to display div tag & function search
    Flows in search 
    2. On change event is executed when we edit the value in the input tag
    => Set Q as value of input
    3. When q changes => UsedEffect based on q is executed
    => func searchData will check isSearch props and filter data (input: bodyData) based on q
    => Set Alldata as returning value of above func 
    4. When Alldata changes => update sliceData props which displayed data on every page
  */

  const { headData, bodyData, renderBody, renderHead, isSearch } = props;

  // Declare allData to handle and change while searching
  let [allData, setAllData] = useState(bodyData);

  useEffect(() => {
    setAllData(bodyData);
  }, [bodyData]);

  const [sliceData, setSliceData] = useState(
    props.limit && allData ? allData.slice(0, props.limit) : allData,
  );
  // Update sliceData based on allData
  useEffect(() => {
    setSliceData(
      props.limit && allData ? allData.slice(0, props.limit) : allData,
    );
  }, [allData]);

  // data is shown in each page
  let [dataShow, setDataShow] = useState(sliceData);
  // Update DataShow in table when SliceData change
  useEffect(() => {
    setDataShow(sliceData);
  }, [sliceData]);
  let maxPage = 1;
  let range = [];
  if (props.limit !== undefined) {
    maxPage = Math.ceil(allData.length / Number(props.limit));
    range = [...Array(maxPage).keys()];
  }
  let [currentPage, setCurrentPage] = useState(1);

  const selectPage = (page) => {
    const start = Number(props.limit) * page;
    const end = start + Number(props.limit);
    // set data is between start and end in each page
    setDataShow(allData.slice(start, end));
    setCurrentPage(page);
  };
  // set State search in table
  let [q, setQ] = useState('');
  const [searchColumns, setSearchColumns] = useState(['name']);
  // let [sortData, setSortData] = useState(allData);
  // function for searching
  const searchData = () => {
    // Stop using func if isSearch is not declared
    // prevent for missing 'name' which declared by searchColumns prop above
    if (isSearch) {
      const result = bodyData.filter((row) =>
        searchColumns.some((column) => {
          return (
            row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          );
        }),
      );
      setAllData(result);
    }
  };
  useEffect(() => {
    searchData();
    console.log('daata search', q);
  }, [q]);

  return (
    <div className="table">
      {isSearch && (
        <div className="searchTable">
          <Control.Input
            name="search"
            label="Tìm kiếm nhanh"
            type="text"
            variant="standard"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
            }}
          />
        </div>
      )}
      <div className="table-wrapper">
        <table>
          {headData && renderHead ? (
            <thead>
              <tr>
                {headData.map((item, index) =>
                  renderHead(item, index),
                )}
              </tr>
            </thead>
          ) : null}
          {allData && renderBody ? (
            <tbody>
              {dataShow.map((item, index) => renderBody(item, index))}
            </tbody>
          ) : null}
        </table>
      </div>
      {maxPage > 1 ? (
        <Pagination
          color="primary"
          count={range.length}
          onChange={(event, page) => selectPage(page)}
        />
      ) : null}
    </div>
  );
};

export default Table;
