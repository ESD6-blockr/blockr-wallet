import { Transaction } from "@blockr/blockr-models";
import * as constants from "../constants/transaction.constant";
import { createReducer } from "../helpers/reducer.helper";

export interface ITransactionState {
    readonly currentTransaction: Transaction | null;
    readonly getTransactionDone: boolean;
    readonly getTransactionError: Error | null;
    readonly getTransactionLoading: boolean;
    readonly transactions: Transaction[];
}

const initialState: ITransactionState = {
    currentTransaction: null,
    getTransactionDone: false,
    getTransactionError: null,
    getTransactionLoading: false,
    transactions: [],
};

const setCurrentTransaction = (state: ITransactionState, action): ITransactionState => ({
    ...state,
    currentTransaction: action.payload,
});

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
    [constants.SET_CURRENT_TRANSACTION]: setCurrentTransaction,
    [constants.GET_TRANSACTIONS_BEGIN]: getTransactionBegin,
    [constants.GET_TRANSACTIONS_SUCCESS]: getTransactionSuccess,
    [constants.GET_TRANSACTIONS_FAILURE]: getTransactionFailure,
};

export default createReducer(initialState, getTransactionHandlers);
