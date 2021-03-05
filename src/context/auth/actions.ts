import {
    AUTHENTICATE_USER,
    LOAD_USER,
    LOGOUT_USER,
    UPDATE_ORDERS,
    AuthenticateAction,
    LoadUserAction,
    LogoutAction,
    UpdateOrdersAction
} from "./types";
import {IUser, IOrder} from "../../types/types";

interface IAuthenticateProps {
    token: string,
    user: IUser
}

export function authenticate({ token, user }: IAuthenticateProps): AuthenticateAction {
    return {
        type: AUTHENTICATE_USER,
        payload: {
            token: token,
            user: user,
        },
    }
}

export function loadUser(user: IUser): LoadUserAction {
    return {
        type: LOAD_USER,
        payload: user,
    }
}

export function logout(): LogoutAction {
    return {
        type: LOGOUT_USER
    }
}

export function updateOrders(orders: Array<IOrder>): UpdateOrdersAction {
    return {
        type: UPDATE_ORDERS,
        payload: orders,
    }
}