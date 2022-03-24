import React,  { useEffect, useState } from 'react';
import OrderTable from '../../components/orders/OrderTable';
import callAPI from '../../utils/apiCaller';

function Order(props) {

    let [data, setData] = useState([])

    let header = [
        "ID",
        "Trạng thái giao hàng",
        "Ngày giao hàng",
        "Tổng giá trị",
        "Tên khách hàng",
        "Ngày tạo hóa đơn",
        "Ngày cập nhật hóa đơn",
        "Chi tiết hóa đơn"
    ];

    useEffect(() => {
        let getData = async () => {
            const { access_jwt_token } = JSON.parse(localStorage.getItem("profile"));
            let getTransactions = await callAPI("/api/transaction/", "GET", null, {authorization: access_jwt_token})
            setData(getTransactions.data.message)
        }
        getData()
    }, [])


    return (
        <div>
            <OrderTable
                tableData={data}
                tableHeader={header}
            />
        </div>
    );
}

export default Order;