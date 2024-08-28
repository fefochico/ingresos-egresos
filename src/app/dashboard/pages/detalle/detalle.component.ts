import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '../../../app.reducer';
import { IngresoEgreso } from '../../../models/ingreso-egreso';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: ''
})
export class DetalleComponent implements OnInit, OnDestroy {
  private ingresosSubs!: Subscription;
  public ingresosEgresos: IngresoEgreso[]=[]  
  constructor(private store: Store<AppState>, private ingresoEgresoService: IngresoEgresoService){}
  ngOnDestroy(): void {
    this.ingresosSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.ingresosSubs= this.store.select('ingresoEgreso').subscribe(({items})=>{
      this.ingresosEgresos= items;
    })
  }

  public borrar(uid: string){
    console.log(uid)
    this.ingresoEgresoService.borrarIngresoEgreso(uid)
    .then(()=> Swal.fire('Borrado', 'Item borrado', 'success'))
    .catch(err=> Swal.fire('Error', err.message, 'error'))
  }


}
