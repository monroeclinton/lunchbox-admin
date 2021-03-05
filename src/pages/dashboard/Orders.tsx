import React, {useState} from "react";
import {Input, Button, Row, Col} from 'antd';

import layoutStyles from "../../../styles/layout.scss";
import formStyles from "../../../styles/form.scss";

import DashboardContainer from "../../components/container/dashboard/DashboardContainer";

import {useAuthState} from "../../context/auth/reducer";
import OrdersTable from "../../components/dashboard/table/OrdersTable";
import {IOrder} from "../../types/types";

interface IState {
    filterTable: Array<IOrder> | null,
    baseData: Array<IOrder>,
}

function Orders(): JSX.Element {

    const authState = useAuthState();

    const [search, setSearch] = useState<IState>({
        filterTable: null,
        baseData: authState.orders,
    });

    const checkOrder = (order: any, search: string): boolean => {
        let exists = false;
        const keys = Object.keys(order);
        for(let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const type = typeof order[key];

            if(type === 'object' && !Array.isArray(order[key])) {
                exists = checkOrder(order[key], search);
            }

            if(Array.isArray(order[key])) {
                for(let j = 0; j < order[key].length; j++) {
                    exists = checkOrder(order[key][j], search);

                    if(exists) {
                        break;
                    }
                }
            }

            if(type === 'string') {
                exists = order[key].indexOf(search) > -1;
            }

            if(exists) {
                break;
            }
        }

        return exists;
    };

    const handleSearch = (value: string) => {


        if(value === ""){
            handleClearSearch();
            return;
        }

        const filterTable = search.baseData.filter((o: any) => {
            console.log(JSON.stringify(checkOrder(o, value)));
            if(checkOrder(o, value)){
                return o;
            }
        });

        setSearch((search: IState) => ({
            ...search,
            filterTable: filterTable
        }));
    };

    const handleClearSearch = () => {
        setSearch((search: IState) => ({
            ...search,
            filterTable: null
        }));
    };

    return (
        <DashboardContainer>
            <h1 className={layoutStyles.mB1}>ORDERS</h1>
            <Row gutter={12}>
                <Col span={18} style={{maxWidth: "650px"}}>
                    <Input.Search placeholder="Search..."
                                  enterButton
                                  onSearch={handleSearch}
                                  className={layoutStyles.mT1 + ' ' + layoutStyles.mB1} />
                </Col>
                <Col className={layoutStyles.flex + ' ' + layoutStyles.alignCenter}>
                    <Button className={formStyles.button + ' ' + formStyles.primary} onClick={handleClearSearch}>
                        Clear
                    </Button>
                </Col>
            </Row>
            <OrdersTable data={search.filterTable === null ? [...authState.orders].reverse() : [...search.filterTable].reverse().reverse()} />
        </DashboardContainer>
    );
}

export default Orders;
export const ORDERS_URL = "/orders";
