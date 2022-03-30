import React, { useEffect, useState } from 'react'
import Button from '../controls/Button.jsx';
import PopUp from '../popup/PopUp.jsx';
import Table from '../table/Table.jsx'
import OrderDetail from './OrderDetail.jsx';
import Badge from '../badge/Badge';

const orderStatus = {
    1: 'primary',
    0: 'warning',
    'Đã giao': 'success',
    'Hoàn tiền': 'danger',
    'Chưa giao': 'warning'
  };

const OrderTable = (props) => {
    const { tableData, tableHeader } = props;
    const [ openPopup, setOpenPopup ] = useState(false);
    const [ currentTransDetail, setCurTranDetail] = useState([])

    const renderHead = (item, index) => <th key={index}> {item} </th>

    const renderBody = (item, index) => {
        const allItemProps = Object.values(item);

        const checkIsStatus = (row) => {
            return (row === "Đã giao" || row === "Chưa giao")
        }

        const renderRow = allItemProps.map(row => {
            if(Array.isArray(row)){
                return (
                    <td>
                        <Button
                            text={`Chi tiết`}
                            size="small"
                            onClick={() => {
                                setCurTranDetail(row)
                                setOpenPopup(true)
                            }}
                        />
                    </td>
                )
            }
            else if (checkIsStatus(row))
                return <td><div><Badge type={orderStatus[row]} content={row} /></div></td>
            else
                return (<td>{`${row}`}</td>)
        })

        return (<tr key={index}> {renderRow} </tr>)
    }

    const renderTransDetail = (transDetails) => {
        let price_total = 0;
        transDetails.forEach(element => {
            price_total += element.price_total;
        });
        return (<div>
            {transDetails.map(eachDetail => <OrderDetail {...eachDetail}/>)}
            <div style={{
                display:"flex",
                justifyContent:"flex-end"
            }}>{`Tổng tiền: ${price_total}`}</div>
        </div>)
    }

    return (
        <div>
            <Table
                limit="5"
                headData={tableHeader}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={tableData}
                renderBody={(item, index) => renderBody(item, index)}
            />

            <PopUp
                title="Chi tiết hóa đơn"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                {renderTransDetail(currentTransDetail)}
            </PopUp>
        </div>
    )
}

export default OrderTable