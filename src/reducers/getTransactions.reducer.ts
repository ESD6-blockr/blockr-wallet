import Transaction from "../components/transaction/Transaction";
import * as constants from "../constants/transaction.constant";

export interface TransactionState {
    readonly getTransactionsLoading: boolean;
    readonly transactions: Transaction[];
    readonly getTransactionsError: Error | null;
}

const defaultState: TransactionState = {
    getTransactionsError: null,
    getTransactionsLoading: false,
    transactions: [],
};

function getTransactionsBegin(state) {
    return {
        ...state,
        getTransactionsLoading: true,
    };
}
function getTransactionsSuccess(state, action) {
    return {
        ...state,
        getRateListDone: true,
        getTransactionsLoading: false,
        transaction: action.payload,
    };
}
function getTransactionsFailure(state, action) {
    return {
        ...state,
        getTransactionsError: action.payload,
        getTransactionsLoading: false,
    };
}

const createReducer = (initialState: any, handlers: any) => {
    return (state = initialState, action: any) => {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        }
        return state;
    };
};

const getTransactionHandlers = {
    [constants.GET_TRANSACTIONS_BEGIN]: getTransactionsBegin,
    [constants.GET_TRANSACTIONS_SUCCESS]: getTransactionsSuccess,
    [constants.GET_TRANSACTIONS_FAILURE]: getTransactionsFailure,
};

export default createReducer(defaultState, getTransactionHandlers);
