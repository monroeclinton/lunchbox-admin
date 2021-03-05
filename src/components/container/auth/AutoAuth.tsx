import React, {useEffect, useRef} from "react";
import {AxiosError, AxiosResponse} from "axios";

import {useAuthDispatch, useAuthState} from "../../../context/auth/reducer";
import apiRequest from "../../../util/ApiRequest";
import {CancelablePromise} from "../../../util/hooks/makeCancelable";
import {loadUser, logout, updateOrders} from "../../../context/auth/actions";

interface IProps {
    children?: React.ReactNode
}

function AutoAuth({children}: IProps): JSX.Element {
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

    useEffect(() => {
        if(authState.isAuthenticated && authState.user === null){
            const resCb = (res: AxiosResponse) => {
                if(res.data && res.data.data && res.data.data.user){
                    authDispatch(loadUser(res.data.data.user));
                }

                if(res.data && res.data.data && res.data.data.orders){
                    authDispatch(updateOrders(res.data.data.orders));
                }
            };

            const errCb = (err: AxiosError) => {
                if(err.response){
                    authDispatch(logout());
                }
            };

            apiRequestRef.current = apiRequest({
                token: authState.token,
                route: "/users/@me",
                method: "GET",
                resCb: resCb,
                errCb: errCb,
                delay: 300,
            });
        }
    }, [authState.isAuthenticated]);

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    );
}

export default AutoAuth;