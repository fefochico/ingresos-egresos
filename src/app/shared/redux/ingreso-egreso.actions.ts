import { createAction, props } from "@ngrx/store";
import { IngresoEgreso } from "../../models/ingreso-egreso";

export const unSetItem = createAction('[IngresoEgreso] Unset item');
export const setItem = createAction('[IngresoEgreso] Set item',     
props<{items: IngresoEgreso[]}>());
