import { logger } from "@blockr/blockr-logger";
import {
    GET_TRANSACTIONS_BEGIN,
    GET_TRANSACTIONS_FAILURE,
    GET_TRANSACTIONS_SUCCESS,
} from "../constants/transaction.constant";
import { ApiService } from "../services/apiService";

export const ALL_TRANSACTIONS = "ALLTRANSACTIONS";
export const RECIPIENT_TRANSACTIONS = "RECIPIENT_TRANSACTIONS";
export const SENDER_TRANSACTIONS = "SENDER_TRANSACTIONS";

const apiService: ApiService = new ApiService();

// export interface AllTransactionsAction extends Action {
//     payload: {
//         transactions: Transaction[],
//     };
//     type: "ALLTRANSACTIONS";
// }

// export interface RecipientTransactionsAction extends Action {
//     payload: {
//         transactions: Transaction[],
//     };
//     type: "RECIPIENT_TRANSACTIONS";
// }

// export interface SenderTransactionsAction extends Action {
//     payload: {
//         transactions: Transaction[],
//     };
//     type: "SENDER_TRANSACTIONS";
// }

export const getAllTransactions = () => {
    logger.info("Within the getAllTransactions method");
    return (dispatch: any) => {
        logger.info("Within the return statement");
        dispatch({ type: GET_TRANSACTIONS_BEGIN });

        return apiService
            .getAllTransactionsAsync()
            .then((response) => {
                dispatch({ type: GET_TRANSACTIONS_SUCCESS, payload: response });
            })
            .catch((error) => {
                logger.error(error);
                dispatch({ type: GET_TRANSACTIONS_FAILURE, error });
            });
    };
};

// export const getAllTransactions: ActionCreator<AllTransactionsAction> = () => ({
//     payload: {
//         transactions: await apiService.getAllTransactionsAsync(),
//     },
//     type: ALL_TRANSACTIONS,
// });

// export const getRecipientTransactions: ActionCreator<RecipientTransactionsAction> = (recipientKey: string) => ({
//     payload: {
//         recipientKey,
//     },
//     type: RECIPIENT_TRANSACTIONS,
// });

// export const getSenderTransactions: ActionCreator<SenderTransactionsAction> = (senderKey: string) => ({
//     payload: {
//         senderKey,
//     },
//     type: SENDER_TRANSACTIONS,
// });

// export type TransactionAction = AllTransactionsAction | RecipientTransactionsAction | SenderTransactionsAction;
