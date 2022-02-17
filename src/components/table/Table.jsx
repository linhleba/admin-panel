import React, { useState } from 'react';
import './table.css';

const Table = (props) => {
  // Use slice to limit data which display in every page
  const sliceData =
    props.limit && props.bodyData
      ? props.bodyData.slice(0, props.limit)
      : props.bodyData;

  const [dataShow, setDataShow] = useState(sliceData);
  let maxPage = 1;
  let range = [];
  if (props.limit !== undefined) {
    maxPage = Math.ceil(props.bodyData.length / Number(props.limit));
    range = [...Array(maxPage).keys()];
  }

  return (
    <div>
      <div className="table-wrapper">
        <table>
          {props.headData && props.renderHead ? (
            <thead>
              <tr>
                {props.headData.map((item, index) =>
                  props.renderHead(item, index),
                )}
              </tr>
            </thead>
          ) : null}
          {props.bodyData && props.renderBody ? (
            <tbody>
              {sliceData.map((item, index) => props.renderBody(item, index))}
            </tbody>
          ) : null}
        </table>
      </div>
      {maxPage > 1 ? (
        <div className="table__pagination">
          {range.map((item, index) => (
            <div key={index} className="table__pagination-item">
              {item + 1}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Table;
