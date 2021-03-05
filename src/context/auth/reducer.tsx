import React from "react";

import {
    AUTHENTICATE_USER,
    LOAD_USER,
    LOGOUT_USER,
    UPDATE_ORDERS,
    IAuthProviderProps,
    IAuthState,
    TAuthAction
} from "./types";
import {localStorageBool} from "../../util/localstorage";

const initialState: IAuthState = {
    isAuthenticated: localStorageBool("authenticated"),
    user: null,
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    orders: [],
};

const AuthStateContext = React.createContext<IAuthState>(initialState);
const AuthDispatchContext = React.createContext<React.Dispatch<any>>(() => null);

function authReducer(state: IAuthState, action: TAuthAction) {
    switch (action.type) {
        case AUTHENTICATE_USER: {
            localStorage.setItem("authenticated", "true");
            localStorage.setItem("token", action.payload.token);

            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                isAuthenticated: true,
            };
        }
        case LOAD_USER: {
            return {
                ...state,
                user: action.payload,
            };
        }
        case LOGOUT_USER: {
            localStorage.setItem("authenticated", "false");
            localStorage.removeItem("token");

            return {
              ...state,
              user: null,
              isAuthenticated: false,
            };
        }
        case UPDATE_ORDERS: {
            return {
                ...state,
                orders: action.payload,
            }
        }
        default: {
            return { ...state };
        }
    }
}

function AuthProvider({ children }: IAuthProviderProps): JSX.Element {
    const [state, dispatch] = React.useReducer(authReducer, initialState);

    return (
        <AuthStateContext.Provider value={state}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    );
}

function useAuthState(): IAuthState {
    const context = React.useContext(AuthStateContext);
    if(context === undefined){
        throw new Error("useAuthState must be used within a AuthProvider");
    }
    return context;
}

function useAuthDispatch(): React.Dispatch<any> {
    const context = React.useContext(AuthDispatchContext);

    if(context === undefined){
        throw new Error("useAuthDispatch must be used within a AuthProvider");
    }
    return context;
}

export { AuthProvider, useAuthState, useAuthDispatch };
