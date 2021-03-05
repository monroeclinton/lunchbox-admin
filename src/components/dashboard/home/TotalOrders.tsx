import React from "react";
import {Card} from "antd";
import {
    HistoryOutlined,
} from '@ant-design/icons';

import layoutStyles from "../../../../styles/layout.scss";
import homeStyles from "../../../../styles/pages/dashboard/home.scss";

interface IProps {
    totalOrders: number,
}

function TotalOrders(props: IProps): JSX.Element {
    const Title = (): JSX.Element => {
        return (
          <div className={layoutStyles.flex + ' ' + layoutStyles.flexColumn + ' ' + layoutStyles.alignCenter}>
              <div className={homeStyles.iconContainer}>
                  <HistoryOutlined className={homeStyles.icon} />
              </div>
              <h2>{props.totalOrders}</h2>
          </div>
        );
    };

    return (
        <Card title={<Title />} bordered={false} style={{ width: 300 }}>
            <div className={layoutStyles.flex + ' ' + layoutStyles.justifyCenter}>
                <p>Total Orders</p>
            </div>
        </Card>
    );
}

export default TotalOrders;
