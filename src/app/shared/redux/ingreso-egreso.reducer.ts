import { Action, createReducer, on } from "@ngrx/store";
import { IngresoEgreso } from "../../models/ingreso-egreso";
import { setItem, unSetItem } from "./ingreso-egreso.actions";
import { AppState} from "../../app.reducer";

export interface State{
    items: IngresoEgreso[];
}

//Crear extension de AppState ya que se carga en lazy Loading
export interface AppStateWithIngreso extends AppState{
    ingresoEgreso: State 
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