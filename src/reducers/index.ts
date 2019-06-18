import { combineReducers } from "redux";

import authenticationReducer, { IAuthenticationState } from "./authentication.reducer";
import getStateReducer, { IBlockchainState } from "./state.reducer";
import getTransactionsReducer, { ITransactionState } from "./transaction.reducer";

export interface IRootState {
    authentication: IAuthenticationState;
    transaction: ITransactionState;
    blockchainState: IBlockchainState;
}

export const rootReducer = combineReducers<IRootState | undefined>({
    authentication: authenticationReducer,
    blockchainState: getStateReducer,
    transaction: getTransactionsReducer,
});
