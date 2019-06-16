import { logger } from "@blockr/blockr-logger";
import { State } from "@blockr/blockr-models";
import { AnyAction, Dispatch } from "redux";
import {
    GET_BLOCKCHAIN_STATE_BEGIN,
    GET_BLOCKCHAIN_STATE_FAILURE,
    GET_BLOCKCHAIN_STATE_SUCCESS,
} from "../constants/state.constant";
import { ApiService } from "../services/apiService";

const apiService: ApiService = new ApiService();

export const getBlockchainStateByPublicKey = (publicKey: string) => {
    return (dispatch: Dispatch<AnyAction>) => {
        dispatch({ type: GET_BLOCKCHAIN_STATE_BEGIN });

        apiService
            .getBlockchainStateByPublicKey(publicKey)
            .then((state: State) => {
                dispatch({ type: GET_BLOCKCHAIN_STATE_SUCCESS, payload: state });
            })
            .catch((error) => {
                logger.error(error);
                dispatch({ type: GET_BLOCKCHAIN_STATE_FAILURE, error });
            });
    };
};
