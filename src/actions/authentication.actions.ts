import { LOGIN, LOGOUT, TOGGLE_LOADING } from "../constants/authentication.constant";
import User from "../models/user";

export const login = (publicKey: string, privateKey: string) => {
    return (dispatch: any) => {
        dispatch({ type: TOGGLE_LOADING });

        setTimeout(() => {
            dispatch({ type: LOGIN, payload: new User(publicKey, privateKey) });
        }, 1000);
    };
};

export const logout = () => {
    return (dispatch: any) => {
        dispatch({ type: LOGOUT });
    };
};
