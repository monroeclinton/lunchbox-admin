import React from "react";
import {Card} from "antd";
import {
    RestOutlined,
} from '@ant-design/icons';

import layoutStyles from "../../../../styles/layout.scss";
import homeStyles from "../../../../styles/pages/dashboard/home.scss";

interface IProps {
    averageOrder: number,
}

function AverageOrder(props: IProps): JSX.Element {
    const Title = (): JSX.Element => {
        return (
          <div className={layoutStyles.flex + ' ' + layoutStyles.flexColumn + ' ' + layoutStyles.alignCenter}>
              <div className={homeStyles.iconContainer}>
                  <RestOutlined className={homeStyles.icon} />
              </div>
              <h2>${props.averageOrder.toFixed(2)}</h2>
          </div>
        );
    };

    return (
        <Card title={<Title />} bordered={false} style={{ width: 300 }}>
            <div className={layoutStyles.flex + ' ' + layoutStyles.justifyCenter}>
                <p>Average Order Price</p>
            </div>
        </Card>
    );
}

export default AverageOrder;
