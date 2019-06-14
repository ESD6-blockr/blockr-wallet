import { logger } from "@blockr/blockr-logger";
import { State } from "@blockr/blockr-models";
import { AnyAction, Dispatch } from "redux";
import {
    GET_STATE_BEGIN,
    GET_STATE_FAILURE,
    GET_STATE_SUCCESS,
    SET_CURRENT_STATE,
} from "../constants/state.constant";
import { ApiService } from "../services/apiService";

const apiService: ApiService = new ApiService();

export const setCurrentState = (state: State) => {
    return (dispatch: Dispatch<AnyAction>) => {
        dispatch({ type: SET_CURRENT_STATE, payload: state });
    };
};

export const getStateByPublicKey = (publicKey: string) => {
    return (dispatch: Dispatch<AnyAction>) => {
        dispatch({ type: GET_STATE_BEGIN });

        apiService
            .getStateByPublicKey(publicKey)
            .then((state: State) => {
                dispatch({ type: GET_STATE_SUCCESS, payload: state });
            })
            .catch((error) => {
                logger.error(error);
                dispatch({ type: GET_STATE_FAILURE, error });
            });
    };
};
