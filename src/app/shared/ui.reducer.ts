import { Action, createReducer, on } from "@ngrx/store";
import { isLoading, stopLoading } from './ui.actions';

export interface State{
    isLoading: boolean;
}

export const initialState: State = {
    isLoading: false
}

const _uiReducer = createReducer(initialState,
    on(isLoading, state => {return {...state, isLoading: true}}),
    on(stopLoading, state => {return {...state, isLoading: false}})
);

export function uiReducer(state: State | undefined, action: Action):any{
    return _uiReducer(state, action);
}