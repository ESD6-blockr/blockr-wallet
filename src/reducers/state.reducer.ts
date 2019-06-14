import { State } from "@blockr/blockr-models";
import * as constants from "../constants/state.constant";
import { createReducer } from "../helpers/reducer.helper";

export interface IStateState {
    readonly currentState: State | null;
    readonly getStateDone: boolean;
    readonly getStateError: Error | null;
    readonly getStateLoading: boolean;
}

const initialState: IStateState = {
    currentState: null,
    getStateDone: false,
    getStateError: null,
    getStateLoading: false,
    state: null,
};

/*
    Set Current State
*/

const setCurrentState = (state: IStateState, action): IStateState => ({
    ...state,
    currentState: action.payload,
});

/*
    Get State
*/

const getStateBegin = (state: IStateState): IStateState => ({
    ...state,
    getStateLoading: true,
});

const getStateSuccess = (state: IStateState, action): IStateState => ({
    ...state,
    currentState: action.payload,
    getStateDone: true,
    getStateLoading: false,
});

const getStateFailure = (state: IStateState, action): IStateState => ({
    ...state,
    getStateError: action.payload,
    getStateLoading: false,
});

export const getStateHandlers = {
    [constants.SET_CURRENT_STATE]: setCurrentState,
    [constants.GET_STATE_BEGIN]: getStateBegin,
    [constants.GET_STATE_SUCCESS]: getStateSuccess,
    [constants.GET_STATE_FAILURE]: getStateFailure,
};

export default createReducer(initialState, getStateHandlers);
