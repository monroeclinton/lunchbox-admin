import React from "react";
import {Col, Row, Form, Input, Button} from "antd";

import layoutStyles from "../../../styles/layout.scss";

import DashboardContainer from "../../components/container/dashboard/DashboardContainer";

import {useAuthState} from "../../context/auth/reducer";

function Profile(): JSX.Element {

    const authState = useAuthState();

    return (
        <DashboardContainer>
            <h1 className={layoutStyles.mB1}>MY PROFILE</h1>
            <Row className={layoutStyles.mB1}>
                <Col>
                    <h3>DETAILS</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>ROLE: Owner</p>
                </Col>
            </Row>
            <Form layout="vertical" className={layoutStyles.mB1}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="First Name"
                            label="First Name"
                            initialValue={authState.user?.name.first_name}
                        >
                            <Input placeholder="First Name" disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="Last Name"
                            label="Last Name"
                            initialValue={authState.user?.name.last_name}
                        >
                            <Input placeholder="Last Name" disabled={true} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Row className={layoutStyles.mB1}>
                <Col>
                    <h3>RESET PASSWORD</h3>
                </Col>
            </Row>
            <Form layout="vertical">
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="Old Password"
                            name="old_password"
                        >
                            <Input.Password disabled={true} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="New Password"
                            name="new_password"
                        >
                            <Input.Password disabled={true} />
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

export default Profile;
export const PROFILE_URL = "/profile";