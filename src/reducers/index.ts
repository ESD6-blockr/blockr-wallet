import { combineReducers, Reducer } from "redux";

import { authenticationReducer, AuthenticationState } from "./authentication.reducer";

export interface RootState {
    authentication: AuthenticationState;
}

export const rootReducer = combineReducers<RootState | undefined>({
    authentication: authenticationReducer,
});
