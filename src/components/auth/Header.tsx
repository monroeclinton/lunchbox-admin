import React from "react";

import styles from "../../../styles/pages/auth/header.scss";

import Icon from "../../../assets/brand/icon.svg";
import Logo from "../../../assets/brand/logo.svg";

function Header(): JSX.Element {
    return (
        <div className={styles.header}>
            <div className={styles.top}>
                <Icon width={65} height={65} />
            </div>
            <div className={styles.body}>
                <Logo width={250} height={42} />
            </div>
        </div>
    );
}

export default Header;