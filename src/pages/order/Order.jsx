import React,  { useEffect, useState } from 'react';
import OrderTable from '../../components/orders/OrderTable';
import callAPI from '../../utils/apiCaller';
import handlePrice from '../../utils/formatPrice/formatPrice';
import moment from 'moment';


function Order(props) {

    let [data, setData] = useState([])

    let header = [
        "Số hóa đơn",
        "Trạng thái giao hàng",
        "Ngày giao hàng",
        "Tổng giá trị",
        "Tên khách hàng",
        "Ngày tạo hóa đơn",
        "Ngày cập nhật hóa đơn",
        "Chi tiết hóa đơn"
    ];

    let formatTransaction = (trans) => {
        let checkShipdateNull = (trans.ship_date === null);
        return {
            ...trans,
            status: (trans.status == 0) ? "Chưa giao" : "Đã giao",
            created_at: moment(trans.created_at).format('DD/MM/YYYY'),
            updated_at: moment(trans.updated_at).format('DD/MM/YYYY'),
            price_total: handlePrice(trans.price_total),
            ship_date: (checkShipdateNull) ? "" : moment(trans.ship_date).format('DD/MM/YYYY'),
        }
    }

    useEffect(() => {
        let getData = async () => {
            const { access_jwt_token } = JSON.parse(localStorage.getItem("profile"));
            let getTransactions = await callAPI("/api/transaction/", "GET", null, {authorization: access_jwt_token})
            let data = getTransactions.data.message.map(trans => formatTransaction(trans));
            setData(data)
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