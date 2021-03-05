import React, {useEffect, useRef, useState} from "react";
import {
    Row, Col,
    Divider,
    Form, Input, InputNumber, Button, Select, Upload,
    message
} from "antd";
import {UploadChangeParam} from "antd/lib/upload";
import {UploadFile} from "antd/lib/upload/interface";
import {AxiosError, AxiosResponse} from "axios";

import layoutStyles from "../../../../styles/layout.scss";
import formStyles from "../../../../styles/form.scss";

import {CancelablePromise} from "../../../util/hooks/makeCancelable";
import apiRequest from "../../../util/ApiRequest";
import {useAuthDispatch, useAuthState} from "../../../context/auth/reducer";

const { Option } = Select;

interface IProps {
    handleNewProduct: () => void,
}

interface IFiles {
    file?: File | Blob,
    fileList: UploadFile<any>[],
}

interface IFormValues {
    title: string,
    description: string,
    product_image: any,
    currency: string,
    price: number,
}

import { UploadProps } from 'antd/lib/upload/interface';
import {loadUser} from "../../../context/auth/actions";
import {MAX_PRODUCT_DESCRIPTION, MAX_PRODUCT_PRICE, MAX_PRODUCT_TITLE} from "../../../constants";

export type RcCustomRequestOptions<T = any> = Parameters<
        Exclude<UploadProps<T>['customRequest'], undefined>
    >[0];

function NewProduct(props: IProps): JSX.Element {

    const [submitting, setSubmitting] = useState<boolean>(false);
    const [files, setFiles] = useState<IFiles>({
        file: undefined,
        fileList: []
    });

    const authState = useAuthState();
    const authDispatch = useAuthDispatch();

    const apiRequestRef = useRef<CancelablePromise | null>(null);

    useEffect(() => {
        return () => {
            if(apiRequestRef.current){
                apiRequestRef.current.cancel();
            }
        };
    }, []);

    const onFinish = (values: IFormValues) => {
        setSubmitting(true);

        const data = {
            title: values.title,
            description: values.description,
            product_image: files.file,
            currency: values.currency,
            price: values.price,
        };

        const resCb = (res: AxiosResponse) => {
            setSubmitting(false);
            message.success("Created new product.");

            const newAuthState = authState;

            if(newAuthState.user && res.data && res.data.data && res.data.data.product){
                newAuthState.user.establishment.menu.push(res.data.data.product);

                authDispatch(loadUser(newAuthState.user));
            }

            props.handleNewProduct();
        };

        const errCb = (_err: AxiosError) => {
            setSubmitting(false);
        };

        apiRequestRef.current = apiRequest({
            token: authState.token,
            route: "/establishment/product",
            method: "POST",
            data: data,
            hasFile: true,
            resCb: resCb,
            errCb: errCb,
        });
    };

    const dummyRequest = ({ file, onSuccess }: RcCustomRequestOptions): void => {
        setTimeout(() => {
            if (onSuccess) {
                onSuccess("ok", new XMLHttpRequest());
            }
        }, 0);
    };

    const onFileChange = (info: UploadChangeParam<UploadFile<any>>): void => {
        switch (info.file.status) {
            case "uploading":
                setFiles(files => ({
                    ...files,
                    fileList: [info.file]
                }))
                break;
            case "done":
                setFiles(files => ({
                    ...files,
                    file: info.file.originFileObj,
                    fileList: [info.file]
                }))
                break;
            default:
                setFiles(files => ({
                    ...files,
                    file: undefined,
                    fileList: []
                }))
                break;
        }
    };

    return (
        <Form layout="vertical" onFinish={onFinish} initialValues={{
            ["currency"]: "USD",
            ["price"]: 1,
        }}>
            <h3 className={layoutStyles.mB1}>New Product</h3>
            <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: 'Enter title of the product' }]}
            >
                <Input maxLength={MAX_PRODUCT_TITLE} />
            </Form.Item>
            <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Enter description of the product' }]}
            >
                <Input.TextArea maxLength={MAX_PRODUCT_DESCRIPTION} autoSize={true} />
            </Form.Item>
            <Form.Item
                name="product_image"
                label="Product Image"
                rules={[{ required: true, message: 'Upload product image' }]}
                style={{maxWidth: "300px"}}
            >
                <Upload
                    accept=".png,.jpg,.jpeg"
                    fileList={files.fileList}
                    customRequest={dummyRequest}
                    onChange={onFileChange}
                    multiple={false}
                >
                    <Button>Choose File</Button>
                </Upload>
            </Form.Item>
            <Row gutter={24}>
                <Col>
                    <Form.Item
                        label="Currency"
                        name="currency"
                    >
                        <Select style={{ width: 120 }} disabled>
                            <Option value="USD">USD</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item
                        label="Price"
                        name="price"
                    >
                        <InputNumber
                            min={1}
                            step={0.01}
                            precision={2}
                            max={MAX_PRODUCT_PRICE}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col>
                    <Form.Item>
                        <Button htmlType="submit" loading={submitting} className={formStyles.button + ' ' + formStyles.primary}>
                            Create
                        </Button>
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item>
                        <Button htmlType="submit" className={formStyles.button} onClick={props.handleNewProduct}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
            <Divider />
        </Form>
    );
}

export default NewProduct;