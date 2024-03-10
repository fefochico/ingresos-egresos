import { Routes } from "@angular/router";
import { EstadisticaComponent } from "./pages/estadistica/estadistica.component";
import { IngresoEgresoComponent } from "./pages/ingreso-egreso/ingreso-egreso.component";
import { DetalleComponent } from "./pages/detalle/detalle.component";

export const dashboardRoutes: Routes=[
    {path: '', component: EstadisticaComponent},
    {path: 'ingreso-egreso', component: IngresoEgresoComponent}, 
    {path: 'detalle', component: DetalleComponent}
]