import React, { useEffect, useState } from 'react'
import Table from '../table/Table.jsx'
// import dotenv from "dotenv"
// // dotenv.config()

const orderHeaderField = [
    "Account",
    "Info"
]

const renderHead = (item, index) => <th key={index}> {item} </th>

const orders = [
    {"field1":"lala", "field2":"lalal"},
    {"field1":"test", "field2":"hello"}
]

const renderBody = (item, index) => {
    const { field1, field2} = item;
    return (
        <tr key={index}>
            <td>{`${field1}`}</td>
            <td>{`${field2}`}</td>
        </tr>
    )
}

const OrderTable = () => {
    let [bookData, setBookData] = useState([
        {"f1":"test", "f2":"alo"},
        {"f1":"test", "f2":"alo"}
    ]);
    let book = async () => {
        let url = "http://localhost:81/api/book"
        let res = await fetch(url)
        return res.json();
    }
    useEffect(() => {
        let fetchBook = async () => {
            let data = await book();
            setBookData(data)
        }
        fetchBook()
    }, [])
    return (
        <div>
            <Table
                limit="5"
                headData={orderHeaderField}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={bookData}
                renderBody={(item, index) => renderBody(item, index)}
            />
        </div>
    )
}

export default OrderTable