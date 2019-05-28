import * as constants from "../constants/authentication.constant";
import { createReducer } from "../helpers/reducer.helper";
import User from "../models/user";

export interface IAuthenticationState {
    readonly currentUser: User | null;
    readonly isLoading: boolean;
}

const initialState: IAuthenticationState = {
    currentUser: null,
    isLoading: false,
};

const login = (state: IAuthenticationState, action): IAuthenticationState => ({
    ...state,
    currentUser: action.payload,
    isLoading: false,
});

const logout = (state: IAuthenticationState): IAuthenticationState => ({
    ...state,
    currentUser: null,
});

const toggleLoading = (state: IAuthenticationState, action): IAuthenticationState => ({
    ...state,
    isLoading: !state.isLoading,
});

export const authenticationHandlers = {
    [constants.LOGIN]: login,
    [constants.LOGOUT]: logout,
    [constants.TOGGLE_LOADING]: toggleLoading,
};

export default createReducer(initialState, authenticationHandlers);
