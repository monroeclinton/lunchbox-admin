import React from "react";
import {Col, Row} from "antd";

import AuthContainer from "../../components/container/auth/AuthContainer";

import loadUserStyles from "../../../styles/containers/loadUser.scss";

import Logo from "../../../assets/brand/logo.svg";
import Spinner from "../../../assets/spinners/circle.svg";
import AutoAuth from "../../components/container/auth/AutoAuth";

function LoadUser(): JSX.Element {
    return (
        <AutoAuth>
            <AuthContainer>
                <Row justify="space-around" align="middle">
                    <Col>
                        <div className={loadUserStyles.loadUser}>
                            <div className={loadUserStyles.spinner}>
                                <Spinner width={42} height={42} />
                            </div>
                            <div className={loadUserStyles.logoContainer}>
                                <Logo width={250} height={42} />
                            </div>
                        </div>
                    </Col>
                </Row>
            </AuthContainer>
        </AutoAuth>
    );
}

export default LoadUser;