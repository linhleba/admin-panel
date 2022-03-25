import React from 'react';

function OrderDetail(props) {
    const { transaction_id, book_id, quantity, price_total} = props;
    return (
        <div>
            <div>{`Mã hóa đơn: ${transaction_id}`}</div>
            <div>{`Mã số sách: ${book_id}`}</div>
            <div>{`Số lượng: ${quantity}`}</div>
            <div>{`Giá: ${price_total}`}</div>
        </div>
    );
}

export default OrderDetail;