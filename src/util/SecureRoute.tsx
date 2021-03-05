import React from "react"
import {Redirect, Route} from "react-router-dom"
import {RouteProps} from "react-router";

import {LOGIN_URL} from "../pages/auth/login/Login";

import {useAuthState} from "../context/auth/reducer";

interface IProps extends RouteProps {
    component: React.ComponentClass<any> | React.FunctionComponent<any>
}

const SecureRoute: React.FC<IProps> = (props: IProps) => {

    const {component: Component, ...rest} = props;

    const authState = useAuthState();

    return (
        <Route
            {...rest}
            render={routeProps =>
                authState.isAuthenticated ? (
                    <Component {...routeProps} />
                ) : (
                    <Redirect to={{ pathname: LOGIN_URL, state: { from: routeProps.location } }} />
                )
            }
        />
    )
}

export default SecureRoute