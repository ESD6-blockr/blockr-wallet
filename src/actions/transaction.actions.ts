import { Transaction } from "@blockr/blockr-models";
import {
    GET_TRANSACTIONS_BEGIN,
    GET_TRANSACTIONS_FAILURE,
    GET_TRANSACTIONS_SUCCESS,
    SET_CURRENT_TRANSACTION,
} from "../constants/transaction.constant";
import { ApiService } from "../services/apiService";

const apiService: ApiService = new ApiService();

export const setCurrentTransaction = (transaction: Transaction) => {
    return (dispatch: any) => {
        dispatch({ type: SET_CURRENT_TRANSACTION, payload: transaction });
    };
};

export const getAllTransactions = () => {
    return (dispatch: any) => {
        dispatch({ type: GET_TRANSACTIONS_BEGIN });

        apiService
            .getAllTransactionsAsync()
            .then((transactions: Transaction[]) => {
                dispatch({ type: GET_TRANSACTIONS_SUCCESS, payload: transactions });
            })
            .catch((error) => {
                console.error(error);
                dispatch({ type: GET_TRANSACTIONS_FAILURE, error });
            });
    };
};

export const getTransactionsBySender = (publicKey: string) => {
    return (dispatch: any) => {
        dispatch({ type: GET_TRANSACTIONS_BEGIN });

        apiService
            .getTransactionsBySender(publicKey)
            .then((transactions: Transaction[]) => {
                dispatch({ type: GET_TRANSACTIONS_SUCCESS, payload: transactions });
            })
            .catch((error) => {
                console.error(error);
                dispatch({ type: GET_TRANSACTIONS_FAILURE, error });
            });
    };
};

export const getTransactionsByRecipient = (publicKey: string) => {
    return (dispatch: any) => {
        dispatch({ type: GET_TRANSACTIONS_BEGIN });

        apiService
            .getTransactionsByRecipient(publicKey)
            .then((transactions: Transaction[]) => {
                dispatch({ type: GET_TRANSACTIONS_SUCCESS, payload: transactions });
            })
            .catch((error) => {
                console.error(error);
                dispatch({ type: GET_TRANSACTIONS_FAILURE, error });
            });
    };
};
