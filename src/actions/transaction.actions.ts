import { logger } from "@blockr/blockr-logger";
import { Transaction } from "@blockr/blockr-models";
import { toast } from "react-toastify";
import { AnyAction, Dispatch } from "redux";
import {
    GET_TRANSACTIONS_BEGIN,
    GET_TRANSACTIONS_BY_RECIPIENT_SUCCESS,
    GET_TRANSACTIONS_BY_SENDER_SUCCESS,
    GET_TRANSACTIONS_FAILURE,
    POST_TRANSACTIONS_BEGIN,
    POST_TRANSACTIONS_FAILURE,
    POST_TRANSACTIONS_SUCCESS,
    SET_CURRENT_TRANSACTION,
} from "../constants/transaction.constant";
import { ApiService } from "../services/apiService";
import store from "../store";
import { goToUrl } from "../store/routerHistory";

const apiService: ApiService = new ApiService();

export const setCurrentTransaction = (transaction: Transaction) => {
    return (dispatch: Dispatch<AnyAction>) => {
        dispatch({ type: SET_CURRENT_TRANSACTION, payload: transaction });
    };
};

export const postTransaction = (transaction: Transaction) => {
    return (dispatch: Dispatch<any>) => {
        dispatch({ type: POST_TRANSACTIONS_BEGIN });

        apiService
            .postTransaction(transaction)
            .then(() => {
                dispatch({ type: POST_TRANSACTIONS_SUCCESS });
                toast.info("Created Transaction");
                const state = store.getState();
                if (state && state.authentication.currentUser) {
                    dispatch(
                        getTransactionsByRecipient(state.authentication.currentUser.publicKey),
                    );
                    goToUrl("/profile");
                }
            })
            .catch((error) => {
                logger.error(error);
                toast.error("Failed to post Transaction");
                dispatch({ type: POST_TRANSACTIONS_FAILURE, error });
            });
    };
};

export const getTransactionsBySender = (publicKey: string) => {
    return (dispatch: Dispatch<AnyAction>) => {
        dispatch({ type: GET_TRANSACTIONS_BEGIN });

        apiService
            .getTransactionsBySender(publicKey)
            .then((transactions: Transaction[]) => {
                dispatch({ type: GET_TRANSACTIONS_BY_SENDER_SUCCESS, payload: transactions });
            })
            .catch((error) => {
                logger.error(error);
                dispatch({ type: GET_TRANSACTIONS_FAILURE, error });
            });
    };
};

export const getTransactionsByRecipient = (publicKey: string) => {
    return (dispatch: Dispatch<AnyAction>) => {
        dispatch({ type: GET_TRANSACTIONS_BEGIN });

        apiService
            .getTransactionsByRecipient(publicKey)
            .then((transactions: Transaction[]) => {
                dispatch({ type: GET_TRANSACTIONS_BY_RECIPIENT_SUCCESS, payload: transactions });
            })
            .catch((error) => {
                logger.error(error);
                dispatch({ type: GET_TRANSACTIONS_FAILURE, error });
            });
    };
};
