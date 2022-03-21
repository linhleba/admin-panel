import React from 'react'
import Table from '../table/Table.jsx'

const orderHeaderField = [
    "field1",
    "field2"
]

const renderHead = (item, index) => <th key={index}> {item} </th>
const renderBody = (item, index) => {
    const { field1, field2} = item;
    console.log(field1);
    return (
        <tr key={index}>
            <td>{`field1: ${field1}`}</td>
            <td>{`field2: ${field2}`}</td>
        </tr>
    )
}
const orders = [
    {"field1":"lala", "field2":"lalal"},
    {"field1":"test", "field2":"hello"}
]
const OrderTable = () => {
    return (
        <div>
            <Table
                limit="5"
                headData={orderHeaderField}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={orders}
                renderBody={(item, index) => renderBody(item, index)}
            />
        </div>
    )
}

export default OrderTable