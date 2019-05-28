import { combineReducers, Reducer } from "redux";

import { authenticationReducer, AuthenticationState } from "./authentication.reducer";
import getTransactionsReducer from "./getTransactions.reducer";

export interface RootState {
    authentication: AuthenticationState;
}

export const rootReducer = combineReducers<RootState | undefined>({
    authentication: authenticationReducer,
    transaction: getTransactionsReducer,
});
