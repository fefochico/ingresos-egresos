import { Action, createReducer, on } from "@ngrx/store";
import { setUser, unSetUser } from './auth.actions';
import { Usuario } from "../models/usuario";

export interface State{
    user: Usuario|null;
}

export const initialState: State = {
    user: null
}

const _authReducer = createReducer(initialState,
    on(setUser, (state, {user}) => {return {...state, user: {...user}}}),
    on(unSetUser, state => {return {...state, user: null}})
);

export function authReducer(state: State | undefined, action: Action):any{
    return _authReducer(state, action);
}