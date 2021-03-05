import React from "react";
import {Link} from "react-router-dom";
import {Row, Col, Card} from "antd";

import layoutStyles from "../../styles/layout.scss";

import {HOME_URL} from "./dashboard/Home";

function NotFound(): JSX.Element {
    return (
        <div className={layoutStyles.flex + ' ' + layoutStyles.flexGrow}>
            <Row className={layoutStyles.mL + ' ' + layoutStyles.mR} justify="space-around" align="middle">
                <Col>
                    <Card headStyle={{border: "none"}}>
                        <h1>Page Not Found</h1>
                        <Link to={HOME_URL}>Return home.</Link>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default NotFound;