import { Action, createReducer, on } from "@ngrx/store";
import { IngresoEgreso } from "../../../models/ingreso-egreso";
import { setItem, unSetItem } from "./ingreso-egreso.actions";

export interface State{
    items: IngresoEgreso[];
}

export const initialState: State = {
    items: [],
}

const _ingresoEgresoReducer = createReducer(initialState,
    on(setItem, (state, { items }) => {return {...state, items: [...items]}}),
    on(unSetItem, state => {return {...state, items: []}})
);

export function ingresoEgresoReducer(state: State | undefined, action: Action):any{
    return _ingresoEgresoReducer(state, action);
}