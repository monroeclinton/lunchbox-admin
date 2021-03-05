import axios, {AxiosResponse, AxiosError, AxiosRequestConfig, Method} from "axios";
import {API_URL} from "../constants";
import {message} from "antd";
import {CancelablePromise, makeCancelable} from "./hooks/makeCancelable";

interface IRequestParams {
    token?: string | null,
    route: string,
    method: Method,
    data?: any,
    hasFile?: boolean,
    resCb?: (resCb: AxiosResponse) => void,
    errCb?: (errCb: AxiosError) => void,
    delay?: number,
}

function request({token, route, method, data, hasFile, resCb, errCb, delay}: IRequestParams): CancelablePromise {
    return makeCancelable(
        new Promise(() => {
            interface IHeader {
             "Content-Type": string,
             "Authorization"?: string
            }

            let contentType = "application/json";

            if(hasFile === true){
                contentType = "multipart/form-data";
            }

            const headers: IHeader = {
                "Content-Type": contentType,
            }

            if(token){
                headers["Authorization"] = token;
            }

            const params: AxiosRequestConfig = {
                headers: headers,
                method: method,
                url: API_URL + route,
            };

            if(data && hasFile !== true){
                params.data = data;
            }

            if(data && hasFile === true && typeof data === "object"){
                const formData = new FormData();

                for (const key in data) {
                    formData.append(key, data[key]);
                }

                params.data = formData;
            }

            setTimeout(() => {
                axios(params)
                    .then((res: AxiosResponse) => {
                        if(resCb){
                            resCb(res);
                        }
                    })
                    .catch((err: AxiosError) => {
                        if(err.response && err.response.data && err.response.data.message){
                            message.error(err.response.data.message);
                        }else{
                            message.error("An unknown error occurred.");
                        }

                        if(errCb){
                            errCb(err);
                        }
                    });
            }, delay ? delay : 0);
        })
    );
}

export default request;