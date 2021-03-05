import React from "react";
import {Button} from "antd";

import layoutStyles from "../../../styles/layout.scss";

import DashboardContainer from "../../components/container/dashboard/DashboardContainer";

import OrdersTable from "../../components/dashboard/table/OrdersTable";
import {useAuthState} from "../../context/auth/reducer";
import {IOrder} from "../../types/types";

function SalesReports(): JSX.Element {

    const authState = useAuthState();

    const handleDownload = () => {

        let csv = "id,payment status,buyer email,price,currency,timestamp\n";

        authState.orders.forEach((order: IOrder): void => {

            csv += order.id + ",";
            csv += order.payment_status.toLowerCase() + ",";
            csv += order.buyer.email + ",";
            csv += order.price + ",";
            csv += order.currency + ",";
            csv += order.timestamp + "\n";

        });

        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv));
        element.setAttribute('download', "sales.csv");

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    };

    return (
    <DashboardContainer>
        <h1 className={layoutStyles.mB1}>SALES REPORTS</h1>
        <div className={layoutStyles.mT1 + ' ' + layoutStyles.mB1}>
           <Button onClick={handleDownload}>
               Download CSV
           </Button>
        </div>
        <OrdersTable data={[...authState.orders].reverse()} />
    </DashboardContainer>
  );
}

export default SalesReports;
export const SALES_REPORTS_URL = "/sales-reports";
