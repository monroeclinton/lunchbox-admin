import React from "react";
import {Card, Col, Row} from "antd";

import styles from "../../../styles/containers/auth.scss";

import Header from "./Header";

interface IProps {
    children?: React.ReactNode
}

function AuthCard({ children }: IProps): JSX.Element {
    return (
        <Row justify="space-around" align="middle">
            <Col>
                <Card title={<Header />} headStyle={{border: "none"}} className={styles.card}>
                    {children}
                </Card>
            </Col>
        </Row>
    );
}

export default AuthCard;
