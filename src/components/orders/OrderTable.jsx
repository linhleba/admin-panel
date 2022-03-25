import React, { useEffect, useState } from 'react'
import Table from '../table/Table.jsx'

const renderHead = (item, index) => <th key={index}> {item} </th>

const renderBody = (item, index) => {
    const allItemProps = Object.values(item);

    const renderRow = allItemProps.map(row => {
        if(Array.isArray(row)){
            let arrayName = row.map(ele => {
                return <div style={{color: "#FF0000"}}>{ele.name}</div>
            })
            return (<td>{arrayName}</td>)
        }
        else
            return (<td>{`${row}`}</td>)
    })

    return (
        <tr key={index}>
            {renderRow}
        </tr>
    )
}

const OrderTable = (props) => {
    const { tableData, tableHeader } = props;
    return (
        <div>
            <Table
                limit="5"
                headData={tableHeader}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={tableData}
                renderBody={(item, index) => renderBody(item, index)}
            />
        </div>
    )
}

export default OrderTable