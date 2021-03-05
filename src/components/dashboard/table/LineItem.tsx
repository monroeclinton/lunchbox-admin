import React from "react";
import {
    Card, Image, Alert, Row, Col
} from "antd";

import layoutStyles from "../../../../styles/layout.scss";

import {ILineItem} from "../../../types/types";

interface IProps {
    item: ILineItem,
}

function LineItem(props: IProps): JSX.Element {

    const Buy = (): JSX.Element => {
        return (
            <div className={layoutStyles.flex}>
                <span>${props.item.product.price}&nbsp;x&nbsp;{props.item.quantity}</span>
                <span className={layoutStyles.mL}>${props.item.product.price*props.item.quantity}</span>
            </div>
        );
    };

    return (
        <div>
            <Card className={layoutStyles.mT1} title={props.item.product.title}>
                <Row gutter={24}>
                    <Col span={18}>
                        <p>{props.item.product.description}</p>
                        <div className={layoutStyles.mT1}>
                            <Alert type="warning" message={<Buy />} />
                        </div>
                    </Col>
                    <Col span={6}>
                        <div>
                            <Image src={props.item.product.image} preview={false} />
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

export default LineItem;