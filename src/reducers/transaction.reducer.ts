import { Transaction } from "@blockr/blockr-models";
import * as constants from "../constants/transaction.constant";
import { createReducer } from "../helpers/reducer.helper";

export interface ITransactionState {
    readonly currentTransaction: Transaction | null;
    readonly getTransactionDone: boolean;
    readonly getTransactionError: Error | null;
    readonly getTransactionLoading: boolean;
    readonly postTransactionDone: boolean;
    readonly postTransactionError: Error | null;
    readonly postTransactionLoading: boolean;
    readonly transactions: Transaction[];
}

const initialState: ITransactionState = {
    currentTransaction: null,
    getTransactionDone: false,
    getTransactionError: null,
    getTransactionLoading: false,
    postTransactionDone: false,
    postTransactionError: null,
    postTransactionLoading: false,
    transactions: [],
};

/*
    Set Current Transaction
*/

const setCurrentTransaction = (state: ITransactionState, action): ITransactionState => ({
    ...state,
    currentTransaction: action.payload,
});

/*
    Get Transaction
*/

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

/*
    Post Transaction
*/

const postTransactionBegin = (state: ITransactionState): ITransactionState => ({
    ...state,
    postTransactionLoading: true,
});

const postTransactionSuccess = (state: ITransactionState): ITransactionState => ({
    ...state,
    postTransactionDone: true,
    postTransactionLoading: false,
});

const postTransactionFailure = (state: ITransactionState, action): ITransactionState => ({
    ...state,
    postTransactionError: action.payload,
    postTransactionLoading: false,
});

export const getTransactionHandlers = {
    [constants.SET_CURRENT_TRANSACTION]: setCurrentTransaction,
    [constants.GET_TRANSACTIONS_BEGIN]: getTransactionBegin,
    [constants.POST_TRANSACTIONS_BEGIN]: postTransactionBegin,
    [constants.GET_TRANSACTIONS_SUCCESS]: getTransactionSuccess,
    [constants.POST_TRANSACTIONS_SUCCESS]: postTransactionSuccess,
    [constants.GET_TRANSACTIONS_FAILURE]: getTransactionFailure,
    [constants.POST_TRANSACTIONS_FAILURE]: postTransactionFailure,
};

export default createReducer(initialState, getTransactionHandlers);
