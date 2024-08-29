import { RouterModule, Routes } from "@angular/router";
import { EstadisticaComponent } from "./pages/estadistica/estadistica.component";
import { IngresoEgresoComponent } from "./pages/ingreso-egreso/ingreso-egreso.component";
import { DetalleComponent } from "./pages/detalle/detalle.component";
import { DashboardComponent } from "./dashboard.component";
import { NgModule } from "@angular/core";

export const dashboardRoutes: Routes=[
    {path:'',
        component: DashboardComponent,
        children:[
            {path: '', component: EstadisticaComponent},
            {path: 'ingreso-egreso', component: IngresoEgresoComponent}, 
            {path: 'detalle', component: DetalleComponent}        
        ],
        //canActivate:[AuthGuard]
    }
]

@NgModule({
    imports: [RouterModule.forChild(dashboardRoutes)],
    exports: [RouterModule]
  })
  export class DashboardRoutesModule { }