import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { IngresoEgresoComponent } from './pages/ingreso-egreso/ingreso-egreso.component';
import { EstadisticaComponent } from './pages/estadistica/estadistica.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { OrdenIngresoPipe } from '../pipes/orden-ingreso.pipe';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutesModule } from './dashboard.routes';


@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresoPipe

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgChartsModule,
    SharedModule,
    DashboardRoutesModule
  ],
})
export class DashboardModule { }
