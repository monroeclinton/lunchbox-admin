import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {Button, Form, Input, message} from "antd";

import layoutStyles from "../../../styles/layout.scss";
import formStyles from "../../../styles/form.scss";

import Label from "../form/Label";
import AuthCard from "./AuthCard";

interface IProps {
    handleFlip: () => void
}

interface IFormValues {
    email: String,
}

function ForgotForm(props: IProps): JSX.Element {
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);

    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        return () => {
            if(timeoutRef.current){
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const onFinish = (_values: IFormValues) => {
        if(submitted){
            message.error("You are doing this too much.");

            timeoutRef.current = window.setTimeout(() => {
                setSubmitted(false);
            }, 30000);

            return;
        }

        setSubmitting(true);
        setSubmitted(true);

        setTimeout(() => {
            setSubmitting(false);
            message.success("An email has been sent to this email if valid.");
        }, 900);
    };

    return (
        <AuthCard>
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item name="email" rules={[{ required: true, type: "email", message: 'Please input your email!' }]}
                           hasFeedback={true} required={false} label={<Label>Email</Label>} validateFirst>
                    <Input placeholder="john@example.com" />
                </Form.Item>
                <Form.Item>
                    <div className={layoutStyles.flex}>
                        <Button htmlType="submit" loading={submitting} className={
                            formStyles.button + ' ' + formStyles.primary
                            + ' ' + formStyles.slider + ' ' + formStyles.large
                        }>
                            <Label>
                                Send Code
                            </Label>
                        </Button>
                    </div>
                </Form.Item>
                <Form.Item>
                    <div className={layoutStyles.flex}>
                        <Link onClick={props.handleFlip} className={layoutStyles.mL} to="#">
                            Return to sign in
                        </Link>
                    </div>
                </Form.Item>
            </Form>
        </AuthCard>
    );
}

export default ForgotForm;