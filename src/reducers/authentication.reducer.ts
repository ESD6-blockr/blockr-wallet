import { Reducer } from "redux";
import {
    AuthenticationAction,
    LOGIN,
    LOGOUT,
    TOGGLE_LOADING,
} from "../actions/authentication.actions";
import User from "../models/user";

export interface AuthenticationState {
    readonly currentUser: User | null;
    readonly isLoading: boolean;
}

const defaultState: AuthenticationState = {
    currentUser: null,
    isLoading: false,
};

export const authenticationReducer: Reducer<AuthenticationState> = (
    state = defaultState,
    action: AuthenticationAction,
) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, currentUser: action.payload.currentUser };
        case LOGOUT:
            return { ...state, currentUser: null };
        case TOGGLE_LOADING:
            return { ...state, isLoading: action.payload.isLoading };
        default:
            return state;
    }
};
