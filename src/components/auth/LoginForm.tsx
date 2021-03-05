import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {Button, Form, Input} from "antd";
import {AxiosResponse, AxiosError} from "axios";

import layoutStyles from "../../../styles/layout.scss";
import formStyles from "../../../styles/form.scss";

import Label from "../form/Label";
import AuthCard from "./AuthCard";

import {useAuthDispatch, useAuthState} from "../../context/auth/reducer";
import {authenticate} from "../../context/auth/actions";
import {CancelablePromise} from "../../util/hooks/makeCancelable";
import apiRequest from "../../util/ApiRequest";
import history from "../../history";
import {HOME_URL} from "../../pages/dashboard/Home";

interface IProps {
    handleFlip: () => void
}

interface IFormValues {
    email: string,
    password: string,
}

function LoginForm(props: IProps): JSX.Element {

    const [submitting, setSubmitting] = useState<boolean>(false);

    const authDispatch = useAuthDispatch();
    const authState = useAuthState();

    const apiRequestRef = useRef<CancelablePromise | null>(null);

    useEffect(() => {
        return () => {
          if(apiRequestRef.current){
              apiRequestRef.current.cancel();
          }
        };
    }, []);

    useEffect(() => {
        if(authState.isAuthenticated){
            history.push(HOME_URL);
        }
    }, [authState.isAuthenticated]);

    const onFinish = (values: IFormValues) => {
        setSubmitting(true);

        const data = {
          email: values.email,
          password: values.password,
        };

        const resCb = (res: AxiosResponse) => {
            if(res.data && res.data.data && res.data.data.user){
                authDispatch(authenticate({
                    token: res.data.data.token,
                    user: res.data.data.user,
                }));
            }

            setSubmitting(false);
        };

        const errCb = (_err: AxiosError) => {
            setSubmitting(false);
        };

        apiRequestRef.current = apiRequest({
            route: "/auth/admin/sign-in",
            method: "POST",
            data: data,
            resCb: resCb,
            errCb: errCb,
            delay: 600,
        });
    };

    return (
        <AuthCard>
            <Form name="login"
                  onFinish={onFinish}
                  layout="vertical">
                <Form.Item name="email" rules={[{ required: true, type: "email", message: 'Please input your email!' }]}
                           hasFeedback={true} required={false} label={<Label>Email</Label>} validateFirst>
                    <Input placeholder="john@example.com" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}
                           hasFeedback={true} required={false} label={<Label>Password</Label>} validateFirst>
                    <Input.Password
                        placeholder="********" />
                </Form.Item>
                <Form.Item>
                    <div className={layoutStyles.flex}>
                        <Link onClick={props.handleFlip} className={layoutStyles.mL} to="#">
                            Forgot Password?
                        </Link>
                    </div>
                </Form.Item>
                <Form.Item>
                    <div className={layoutStyles.flex}>
                        <Button htmlType="submit" loading={submitting} className={
                            formStyles.button + ' ' + formStyles.primary
                            + ' ' + formStyles.slider + ' ' + formStyles.large
                        }>
                            <Label>
                                Login
                            </Label>
                        </Button>
                    </div>
                </Form.Item>
                <div>
                    <p><small>This is a demo for my LunchBox job application. By Monroe Clinton.</small></p>
                </div>
            </Form>
        </AuthCard>
    );
}

export default LoginForm;