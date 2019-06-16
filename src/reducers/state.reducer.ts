import { State } from "@blockr/blockr-models";
import * as constants from "../constants/state.constant";
import { createReducer } from "../helpers/reducer.helper";

export interface IBlockchainState {
    readonly currentBlockchainState: State | null;
    readonly getStateDone: boolean;
    readonly getStateError: Error | null;
    readonly getStateLoading: boolean;
}

const initialState: IBlockchainState = {
    currentBlockchainState: null,
    getStateDone: false,
    getStateError: null,
    getStateLoading: false,
    state: null,
};

/*
    Get State
*/

const getStateBegin = (state: IBlockchainState): IBlockchainState => ({
    ...state,
    getStateLoading: true,
});

const getStateSuccess = (state: IBlockchainState, action): IBlockchainState => ({
    ...state,
    currentBlockchainState: action.payload,
    getStateDone: true,
    getStateLoading: false,
});

const getStateFailure = (state: IBlockchainState, action): IBlockchainState => ({
    ...state,
    getStateError: action.payload,
    getStateLoading: false,
});

export const getStateHandlers = {
    [constants.GET_BLOCKCHAIN_STATE_BEGIN]: getStateBegin,
    [constants.GET_BLOCKCHAIN_STATE_SUCCESS]: getStateSuccess,
    [constants.GET_BLOCKCHAIN_STATE_FAILURE]: getStateFailure,
};

export default createReducer(initialState, getStateHandlers);
