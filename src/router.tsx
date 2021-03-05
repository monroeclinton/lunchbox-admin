import React from "react";
import {Router, Switch, Route} from "react-router-dom";

import Home, {HOME_URL} from "./pages/dashboard/Home";
import SalesReports, {SALES_REPORTS_URL} from "./pages/dashboard/SalesReports";
import Orders, {ORDERS_URL} from "./pages/dashboard/Orders";
import Menu, {MENU_URL} from "./pages/dashboard/Menu";
import Profile, {PROFILE_URL} from "./pages/dashboard/Profile";
import Settings, {SETTINGS_URL} from "./pages/dashboard/Settings";

import Login, {LOGIN_URL} from "./pages/auth/login/Login";
import LoadUser from "./pages/auth/LoadUser";
import NotFound from "./pages/NotFound";

import SecureRoute from "./util/SecureRoute";
import {useAuthState} from "./context/auth/reducer";
import history from "./history";

function AppRouter(): JSX.Element {

    const authState = useAuthState();

    return (
        <Router history={history}>
            <Switch>
                <Route path={LOGIN_URL} exact={true} component={Login} />

                {
                    (authState.isAuthenticated && authState.user === null) &&
                    <Route component={LoadUser} />
                }

                <SecureRoute path={HOME_URL} exact={true} component={Home} />
                <SecureRoute path={SALES_REPORTS_URL} exact={true} component={SalesReports} />
                <SecureRoute path={ORDERS_URL} exact={true} component={Orders} />
                <SecureRoute path={MENU_URL} exact={true} component={Menu} />
                <SecureRoute path={PROFILE_URL} exact={true} component={Profile} />
                <SecureRoute path={SETTINGS_URL} exact={true} component={Settings} />

                <Route component={NotFound} />
            </Switch>
        </Router>
    );
}

export default AppRouter;