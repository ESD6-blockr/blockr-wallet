import { combineReducers } from "redux";

import authenticationReducer, { IAuthenticationState } from "./authentication.reducer";
import getStateReducer, { IStateState } from "./state.reducer";
import getTransactionsReducer, { ITransactionState } from "./transaction.reducer";

export interface IRootState {
    authentication: IAuthenticationState;
    transaction: ITransactionState;
    state: IStateState;
}

export const rootReducer = combineReducers<IRootState | undefined>({
    authentication: authenticationReducer,
    state: getStateReducer,
    transaction: getTransactionsReducer,
});
