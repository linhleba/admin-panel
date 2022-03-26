import React, { useEffect, useState }  from 'react';
import apiCaller from '../../utils/apiCaller';

let styles ={
    order_detail_container: {
        margin: "10px",
        display: "flex",
    },
    book_image: {
        width: "100px",
        height: "100px"
    },
    info_container:{
        margin: "20px",
        minWidth: "300px"
    },
    price_total: {
        fontWeight: 'bold',
        textAlign: "center",
        alignSelf: "center"
    }
}
function OrderDetail(props) {
    const { transaction_id, book_id, quantity, price_total} = props;

    const [ bookOrderInfo, setBookInfo ] = useState({})
    useEffect(() => {
        let getOrderBook = async () => {
            let getBookDetail = await apiCaller(`/api/book/${book_id}`);
            let bookDetail = {
                ...getBookDetail.data,
                quantity: quantity,
                price_total: price_total,
            }
            setBookInfo(bookDetail)
        }

        getOrderBook()
    }, [])

    return (
        <div style={styles.order_detail_container}>
            <img
                src={bookOrderInfo.image_url}
                alt="Album Art"
                style={styles.book_image}
            />
            <div style={styles.info_container}>
                <div>{`Tên sách: ${bookOrderInfo.name}`}</div>
                <div>{`Giá: ${bookOrderInfo.price} `}</div>
                <div>{`Số lượng: ${bookOrderInfo.quantity}`}</div>
            </div>
            <span style={styles.price_total}>{bookOrderInfo.price_total}</span>
        </div>
    );
}

export default OrderDetail;