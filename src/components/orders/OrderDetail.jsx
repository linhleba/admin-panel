import React, { useEffect, useState } from 'react';
import apiCaller from '../../utils/apiCaller';

function OrderDetail(props) {
    const { transaction_id, book_id, quantity, price_total} = props;

    const [ bookOrderInfo, setBookInfo ] = useState({})
    useEffect(() => {
        let getOrderBook = async () => {
            let getBookDetail = await apiCaller(`/api/book/${book_id}`);
            let bookDetail = {
                ...getBookDetail.data,
                quantity: quantity
            }
            setBookInfo(bookDetail)
        }

        getOrderBook()
    }, [])

    return (
        <div>
            <div>{`Mã hóa đơn: ${transaction_id}`}</div>
            <div>{`Số lượng: ${quantity}`}</div>
            <div>{`Giá: ${price_total}`}</div>
            <div>{`Ten sach: ${bookOrderInfo.name}`}</div>
        </div>
    );
}

export default OrderDetail;