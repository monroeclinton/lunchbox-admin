import React from "react";

import styles from "../../../../styles/containers/auth.scss";

interface IProps {
    children?: React.ReactNode
}

function AuthContainer({ children }: IProps): JSX.Element {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
}

export default AuthContainer;
