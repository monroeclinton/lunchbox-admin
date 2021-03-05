import React from "react";
import {Link} from "react-router-dom";
import {Layout, Menu} from "antd";
import {
    DollarOutlined,
    ShoppingCartOutlined,
    MenuOutlined,
    UserOutlined,
    LogoutOutlined,
    HomeOutlined,
} from '@ant-design/icons';


const {Sider} = Layout;

import navStyles from "../../../../styles/nav.scss";

import Logo from "../../../../assets/brand/logo.svg"

import {HOME_URL} from "../../../pages/dashboard/Home";
import {SALES_REPORTS_URL} from "../../../pages/dashboard/SalesReports";
import {ORDERS_URL} from "../../../pages/dashboard/Orders";
import {MENU_URL} from "../../../pages/dashboard/Menu";
import {PROFILE_URL} from "../../../pages/dashboard/Profile";

import {useAuthDispatch} from "../../../context/auth/reducer";
import {logout} from "../../../context/auth/actions";
import history from "../../../history";
import {SETTINGS_URL} from "../../../pages/dashboard/Settings";

function Sidebar(): JSX.Element {

    const authDispatch = useAuthDispatch();

    const handleLogout = (): void => {
        authDispatch(logout());
    };

    return (
        <Sider width={310} className={navStyles.sidebar}>
            <div className={navStyles.logoContainer}>
                <Logo className={navStyles.logo} />
            </div>
            <Menu theme="dark" selectedKeys={[history.location.pathname]} mode="inline">
                <Menu.Item key="/" icon={<HomeOutlined />}>
                    <Link to={HOME_URL}>
                        Home
                    </Link>
                </Menu.Item>
                <Menu.Item key="/sales-reports" icon={<DollarOutlined />}>
                    <Link to={SALES_REPORTS_URL}>
                        Sales Reports
                    </Link>
                </Menu.Item>
                <Menu.Item key="/orders" icon={<ShoppingCartOutlined />}>
                    <Link to={ORDERS_URL}>
                        Search for Orders
                    </Link>
                </Menu.Item>
                <Menu.Item key="/menu" icon={<MenuOutlined />}>
                    <Link to={MENU_URL}>
                        Menu Entities
                    </Link>
                </Menu.Item>
                <Menu.Item key="/profile" icon={<UserOutlined />}>
                    <Link to={PROFILE_URL}>
                        Profile
                    </Link>
                </Menu.Item>
                <Menu.Item key="/settings" icon={<UserOutlined />}>
                    <Link to={SETTINGS_URL}>
                        Settings
                    </Link>
                </Menu.Item>
                <Menu.Item key="logout" onClick={handleLogout} icon={<LogoutOutlined />}>
                    Logout
                </Menu.Item>
            </Menu>
        </Sider>
    );
}

export default Sidebar;