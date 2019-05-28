import { combineReducers, Reducer } from "redux";

import authenticationReducer, { IAuthenticationState } from "./authentication.reducer";
import getTransactionsReducer, { ITransactionState } from "./getTransactions.reducer";

export interface IRootState {
    authentication: IAuthenticationState;
    transaction: ITransactionState;
}

export const rootReducer = combineReducers<IRootState | undefined>({
    authentication: authenticationReducer,
    transaction: getTransactionsReducer,
});
