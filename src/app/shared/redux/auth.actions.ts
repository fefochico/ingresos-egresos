import {createAction, props} from '@ngrx/store';
import { Usuario } from '../../models/usuario';

export const setUser = createAction(
    '[Auth] Set user', 
    props<{user: Usuario}>()
);

export const unSetUser = createAction(
    '[Auth] Unset user'
);