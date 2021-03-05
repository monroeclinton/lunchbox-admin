import React from "react";

import formStyles from "../../../styles/form.scss";

interface IProps {
    children?: React.ReactNode
}

function Label(props: IProps): JSX.Element{
    return (
        <div className={formStyles.label}>
            <span>{props.children}</span>
        </div>
    );
}

export default Label;
