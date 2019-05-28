import { Transaction } from "@blockr/blockr-models";
import * as constants from "../constants/transaction.constant";
import { createReducer } from "./helper";

export interface ITransactionState {
    readonly getTransactionDone: boolean;
    readonly getTransactionError: Error | null;
    readonly getTransactionLoading: boolean;
    readonly transactions: Transaction[];
}

const initialState: ITransactionState = {
    getTransactionDone: false,
    getTransactionError: null,
    getTransactionLoading: false,
    transactions: [],
};

const getTransactionBegin = (state: ITransactionState): ITransactionState => ({
    ...state,
    getTransactionLoading: true,
});

const getTransactionSuccess = (state: ITransactionState, action): ITransactionState => ({
    ...state,
    getTransactionDone: true,
    getTransactionLoading: false,
    transactions: action.payload,
});

const getTransactionFailure = (state: ITransactionState, action): ITransactionState => ({
    ...state,
    getTransactionError: action.payload,
    getTransactionLoading: false,
});

export const getTransactionHandlers = {
    [constants.GET_TRANSACTIONS_BEGIN]: getTransactionBegin,
    [constants.GET_TRANSACTIONS_SUCCESS]: getTransactionSuccess,
    [constants.GET_TRANSACTIONS_FAILURE]: getTransactionFailure,
};

export default createReducer(initialState, getTransactionHandlers);
