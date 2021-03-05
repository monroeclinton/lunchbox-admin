import React from "react";
import {Card} from "antd";
import {
    DollarOutlined,
} from '@ant-design/icons';

import layoutStyles from "../../../../styles/layout.scss";
import homeStyles from "../../../../styles/pages/dashboard/home.scss";

interface IProps {
    totalRevenue: number,
}

function TotalRevenue(props: IProps): JSX.Element {
    const Title = (): JSX.Element => {
        return (
          <div className={layoutStyles.flex + ' ' + layoutStyles.flexColumn + ' ' + layoutStyles.alignCenter}>
              <div className={homeStyles.iconContainer}>
                  <DollarOutlined className={homeStyles.icon} />
              </div>
              <h2>${props.totalRevenue.toFixed(2)}</h2>
          </div>
        );
    };

    return (
        <Card title={<Title />} bordered={false} style={{ width: 300 }}>
            <div className={layoutStyles.flex + ' ' + layoutStyles.justifyCenter}>
                <p>Total Revenue</p>
            </div>
        </Card>
    );
}

export default TotalRevenue;
