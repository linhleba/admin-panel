import React, { useEffect, useState } from 'react'
import Button from '../controls/Button.jsx';
import PopUp from '../popup/PopUp.jsx';
import Table from '../table/Table.jsx'
import OrderDetail from './OrderDetail.jsx';

const OrderTable = (props) => {
    const { tableData, tableHeader } = props;
    const [ openPopup, setOpenPopup ] = useState(false);
    const [ currentTransDetail, setCurTranDetail] = useState([])

    const renderHead = (item, index) => <th key={index}> {item} </th>

    const renderBody = (item, index) => {
        const allItemProps = Object.values(item);

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
            else
                return (<td>{`${row}`}</td>)
        })

        return (<tr key={index}> {renderRow} </tr>)
    }

    const renderTransDetail = (transDetails) => {
        return (transDetails.map(eachDetail => <OrderDetail {...eachDetail}/>))
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