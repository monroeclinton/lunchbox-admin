import React from "react";
import {Row, Col} from "antd";

import layoutStyles from "../../../styles/layout.scss";

import DashboardContainer from "../../components/container/dashboard/DashboardContainer";
import TotalOrders from "../../components/dashboard/home/TotalOrders";
import TotalRevenue from "../../components/dashboard/home/TotalRevenue";
import AverageOrder from "../../components/dashboard/home/AverageOrder";
import TotalPatrons from "../../components/dashboard/home/TotalPatrons";

import {useAuthState} from "../../context/auth/reducer";

function Home(): JSX.Element {

    const authState = useAuthState();

    const totalRevenue = authState.orders.length ? authState.orders.reduce((a, b) => +a + +b.price, 0) : 0;
    const averageOrder = authState.orders.length ? totalRevenue / authState.orders.length : 0;
    const totalPatrons = [...new Set(authState.orders.map(item => item.buyer.id))].length;

    return (
        <DashboardContainer>
            <h1 className={layoutStyles.mB1}>ANALYTICS BREAKDOWN</h1>
            <Row gutter={16}>
                <Col>
                    <TotalOrders totalOrders={authState.orders.length} />
                </Col>
                <Col>
                    <TotalRevenue totalRevenue={totalRevenue} />
                </Col>
            </Row>
            <Row gutter={16}>
                <Col>
                    <AverageOrder averageOrder={averageOrder} />
                </Col>
                <Col>
                    <TotalPatrons totalPatrons={totalPatrons} />
                </Col>
            </Row>
        </DashboardContainer>
    );
}

export default Home;
export const HOME_URL = "/";