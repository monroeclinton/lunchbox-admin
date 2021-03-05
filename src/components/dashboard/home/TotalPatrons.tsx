import React from "react";
import {Card} from "antd";
import {
    TeamOutlined,
} from '@ant-design/icons';

import layoutStyles from "../../../../styles/layout.scss";
import homeStyles from "../../../../styles/pages/dashboard/home.scss";

interface IProps {
    totalPatrons: number,
}

function TotalPatrons(props: IProps): JSX.Element {
    const Title = (): JSX.Element => {
        return (
          <div className={layoutStyles.flex + ' ' + layoutStyles.flexColumn + ' ' + layoutStyles.alignCenter}>
              <div className={homeStyles.iconContainer}>
                  <TeamOutlined className={homeStyles.icon} />
              </div>
              <h2>{props.totalPatrons}</h2>
          </div>
        );
    };

    return (
        <Card title={<Title />} bordered={false} style={{ width: 300 }}>
            <div className={layoutStyles.flex + ' ' + layoutStyles.justifyCenter}>
                <p>Total Patrons</p>
            </div>
        </Card>
    );
}

export default TotalPatrons;
