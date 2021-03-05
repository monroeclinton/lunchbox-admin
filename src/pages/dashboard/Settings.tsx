import React from "react";

import layoutStyles from "../../../styles/layout.scss";

import DashboardContainer from "../../components/container/dashboard/DashboardContainer";
import {Button, Col, Form, Input, Row} from "antd";
import {useAuthState} from "../../context/auth/reducer";

function Settings(): JSX.Element {

    const authState = useAuthState();

    return (
        <DashboardContainer>
            <h1 className={layoutStyles.mB1}>SETTINGS</h1>
            <Row className={layoutStyles.mB1}>
                <Col>
                    <h3>ESTABLISHMENT</h3>
                </Col>
            </Row>
            <Form layout="vertical">
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="Establishment Name"
                            name="establishment_name"
                            initialValue={authState.user?.establishment.name}
                        >
                            <Input disabled={true} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="Establishment Domain"
                            name="establishment_domain"
                            initialValue={authState.user?.establishment.domain}
                        >
                            <Input disabled={true} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="Stripe Public Key"
                            name="stripe_pk"
                            initialValue={authState.user?.establishment.stripe_pk}
                        >
                            <Input disabled={true} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" disabled={true}>
                                Save
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label>* Disabled in Demo mode.</label>
                    </Col>
                </Row>
            </Form>
        </DashboardContainer>
    );
}

export default Settings;
export const SETTINGS_URL = "/settings";