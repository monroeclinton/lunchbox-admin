import React, {useState} from "react";
import ReactCardFlip from "react-card-flip";

import AuthContainer from "../../../components/container/auth/AuthContainer";

import LoginForm from "../../../components/auth/LoginForm";
import ForgotForm from "../../../components/auth/ForgotForm";

function Login(): JSX.Element {
    const [flipped, setFlipped] = useState(false);

    function handleFlip() {
        setFlipped(!flipped);
    }

    const flipStyles = {
        display: "flex",
        justifyContent: "center"
    }

    return (
        <AuthContainer>
            <ReactCardFlip isFlipped={flipped}
                           flipDirection="horizontal"
                           cardStyles={{front: flipStyles, back: flipStyles}}
                           containerStyle={flipStyles}>
                <LoginForm handleFlip={handleFlip} key="login" />

                <ForgotForm handleFlip={handleFlip} key="forgot" />
            </ReactCardFlip>
        </AuthContainer>
    );
}

export default Login;
export const LOGIN_URL = "/login";
