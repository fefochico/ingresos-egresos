import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../../../models/ingreso-egreso';
import { ChartConfiguration } from 'chart.js';
import { AppStateWithIngreso } from '../../../shared/redux/ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: ''
})
export class EstadisticaComponent implements OnInit{
  ingresos: number=0;
  egresos: number=0;

  TotalEgresos: number=0;
  TotalIngresos: number=0;


  // Doughnut
  public doughnutChartLabels: string[] = [ 'Ingresos', 'Egresos' ];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
      { data: [ ]},
    ];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true
  };

  constructor(private store: Store<AppStateWithIngreso>){

  }
  ngOnInit(): void {
    this.store.select("ingresoEgreso")
    .subscribe(({items})=> this.generarEstadisticas(items));
  }

  generarEstadisticas(items: IngresoEgreso[]){
    this.TotalEgresos=0;
    this.TotalIngresos=0;
    this.ingresos=0;
    this.egresos=0;
    
    for(const item of items){
      if(item.tipo==='ingreso') {
        this.TotalIngresos+=item.cantidad;
        this.ingresos++;
      }
      if(item.tipo==='egreso') {
        this.TotalEgresos+=item.cantidad;
        this.egresos++;
      }
    }

    this.doughnutChartDatasets[0].data=[this.TotalIngresos, this.TotalEgresos];
  }
}
