import { ActionReducerMap } from "@ngrx/store";
import * as ui from "./shared/redux/ui.reducer";
import * as auth from "./shared/redux/auth.reducer";
import * as ingresoEgreso from "./shared/redux/ingreso-egreso.reducer";

export interface AppState{
    ui: ui.State,
    user: auth.State,
    //ingresoEgreso: ingresoEgreso.State -> lazy loading de reducer
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: ui.uiReducer,
    user: auth.authReducer,
    //ingresoEgreso: ingresoEgreso.ingresoEgresoReducer-> lazy loading de reducer
}