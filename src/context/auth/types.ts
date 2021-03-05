import {ReactNode} from "react";
import {IUser, IOrder} from "../../types/types";

// Constants
export const AUTHENTICATE_USER = "AUTHENTICATE_USER";
export const LOAD_USER = "LOAD_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const UPDATE_ORDERS = "UPDATE_ORDERS";

// Actions
export interface AuthenticateAction {
    type: typeof AUTHENTICATE_USER,
    payload: {
        token: string,
        user: IUser,
    },
}

export interface LoadUserAction {
    type: typeof LOAD_USER,
    payload: IUser,
}

export interface LogoutAction {
    type: typeof LOGOUT_USER,
}

export interface UpdateOrdersAction {
    type: typeof UPDATE_ORDERS,
    payload: Array<IOrder>,
}

export type TAuthAction = (AuthenticateAction | LoadUserAction | LogoutAction | UpdateOrdersAction);

// State
export interface IAuthState {
    isAuthenticated: boolean,
    token: string | null,
    user: IUser | null,
    orders: Array<IOrder>,
}

// Provider

export interface IAuthProviderProps {
    children: ReactNode,
}