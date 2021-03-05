import React from "react";

import styles from "../../../../styles/containers/dashboard.scss";

import Sidebar from "../../dashboard/nav/Sidebar";

interface IProps {
    children?: React.ReactNode
}

function DashboardContainer({ children }: IProps): JSX.Element {

    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
}

export default DashboardContainer;