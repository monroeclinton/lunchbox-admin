import React from "react";
import {Badge, Card, Divider, Image} from "antd";

import layoutStyles from "../../../../styles/layout.scss";

import {IProduct} from "../../../types/types";

interface IProps {
    product: IProduct,
}

function Product(props: IProps): JSX.Element {
    return (
        <div style={{maxWidth: "350px"}}>
            <Badge.Ribbon text={props.product.price + " " + props.product.currency}>
                <Card className={layoutStyles.mT1} title={props.product.title}>
                    <Image src={props.product.image} preview={false} />
                    <Divider />
                    <p>{props.product.description}</p>
                </Card>
            </Badge.Ribbon>
        </div>
    );
}

export default Product;