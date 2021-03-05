import React from "react";
import {Table, Tag} from 'antd';
import {ColumnsType} from "antd/es/table";

import layoutStyles from "../../../../styles/layout.scss";

import LineItem from "./LineItem";

import {PAYMENT_STATUS_FINISHED, PAYMENT_STATUS_PENDING} from "../../../constants";
import {IEstablishment, ILineItem, IOrder, IUser} from "../../../types/types";

interface IProps {
    data: Array<IOrder>,
}

function OrdersTable(props: IProps): JSX.Element {

    // eslint-disable-next-line @typescript-eslint/ban-types
    const columns: ColumnsType<IOrder> = [
        {
            title: 'Payment Status',
            dataIndex: 'payment_status',
            key: 'payment_status',
            // eslint-disable-next-line react/display-name
            render: (text: string): JSX.Element => {
                if(text === PAYMENT_STATUS_PENDING){
                    return (
                        <Tag color="blue">
                            Payment Pending
                        </Tag>
                    );
                }

                if(text === PAYMENT_STATUS_FINISHED){
                    return (
                        <Tag color="green">
                            Paid
                        </Tag>
                    );
                }

                return (
                    <Tag color="red">
                        Unknown Status
                    </Tag>
                )
            },
        },
        {
            title: 'Establishment',
            dataIndex: "establishment",
            key: "establishment",
            // eslint-disable-next-line react/display-name
            render: (establishment: IEstablishment): JSX.Element | null => {
                if(!establishment || !establishment.name){
                    return null;
                }

                return (
                    <b>{establishment.name}</b>
                );
            }
        },
        {
            title: 'Buyer Name',
            dataIndex: "buyer",
            key: "buyer_name",
            // eslint-disable-next-line react/display-name
            render: (buyer: IUser): JSX.Element | null => {
                if(!buyer || !buyer.name || !buyer.name.first_name || !buyer.name.last_name){
                    return null;
                }

                return (
                    <p>{buyer.name.first_name + ' ' + buyer.name.last_name}</p>
                );
            }
        },
        {
            title: 'Buyer Email',
            dataIndex: "buyer",
            key: "buyer_email",
            // eslint-disable-next-line react/display-name
            render: (buyer: IUser): JSX.Element | null => {
                if(!buyer || !buyer.email){
                    return null;
                }

                return (
                    <p>{buyer.email}</p>
                );
            }
        },
        {
            title: 'Order Total',
            dataIndex: "price",
            key: "price",
            // eslint-disable-next-line react/display-name
            render: (price: number): JSX.Element => {
                return (
                    <p>${price}</p>
                );
            }
        },
        {
            title: 'Time Purchased',
            dataIndex: "timestamp",
            key: "timestamp",
            // eslint-disable-next-line react/display-name
            render: (timestamp: string): JSX.Element => {
                const date = new Date(timestamp);
                return (
                    <p>{date.toDateString()}</p>
                );
            }
        }
    ];

    const ProductRow = (rec: IOrder): JSX.Element => {

        return (
            <div className={layoutStyles.mL1} style={{maxWidth: "750px"}}>
                {
                    rec.products.map((lineItem: ILineItem, i) => <LineItem key={i} item={lineItem} />)
                }
            </div>
        );
    }

    return (
        <Table columns={columns}
               dataSource={props.data}
               expandRowByClick={true}
               expandedRowRender={(rec: IOrder) => <ProductRow {...rec} />}
               rowKey={(rec: IOrder) => rec.id} />
    );
}

export default OrdersTable;