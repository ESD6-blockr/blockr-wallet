import { Action, ActionCreator } from "redux";
import User from "../models/user";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const TOGGLE_LOADING = "TOGGLELOADING";

export interface LoginAction extends Action {
    payload: {
        currentUser: User | null;
    };
    type: "LOGIN";
}

export interface LogoutAction extends Action {
    type: "LOGOUT";
}

export interface ToggleLoadingAction extends Action {
    payload: {
        isLoading: boolean;
    };
    type: "TOGGLELOADING";
}

export const login: ActionCreator<LoginAction> = (user: User | null) => ({
    payload: {
        currentUser: user,
    },
    type: LOGIN,
});

export const logout: ActionCreator<LogoutAction> = () => ({
    type: LOGOUT,
});

export const toggleLoading: ActionCreator<ToggleLoadingAction> = (isLoading: boolean) => ({
    payload: {
        isLoading,
    },
    type: TOGGLE_LOADING,
});

export type AuthenticationAction = LoginAction | LogoutAction | ToggleLoadingAction;
