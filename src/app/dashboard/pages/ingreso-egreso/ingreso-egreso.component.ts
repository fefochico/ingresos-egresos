import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoEgreso } from '../../../models/ingreso-egreso';
import { IngresoEgresoService } from '../../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppState } from '../../../app.reducer';
import { Store } from '@ngrx/store';
import * as ui from '../../../shared/redux/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: ''
})
export class IngresoEgresoComponent implements OnInit, OnDestroy{

  ingresoForm!: FormGroup;
  tipo: string='ingreso';
  cargando: boolean=false;
  loadingSubs!: Subscription;

  constructor(private fb: FormBuilder, private ingresoEgresoService: IngresoEgresoService, private store: Store<AppState>){}

  ngOnInit(){
    this.loadingSubs= this.store.select('ui').subscribe(ui=> this.cargando= ui.isLoading);

    this.ingresoForm= this.fb.group({
      descripcion: ['', Validators.required],
      cantidad: ['', Validators.required],
    })
  }

  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
  }


  guardar(){

    if(this.ingresoForm.invalid) return;
    this.store.dispatch(ui.isLoading());

    console.log(this.ingresoForm.value)

    const {descripcion, cantidad} = this.ingresoForm.value;

    const ingresoEgreso= new IngresoEgreso(descripcion, cantidad, this.tipo);

    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso).then(()=>{
      this.ingresoForm.reset()
      this.store.dispatch(ui.stopLoading());
      Swal.fire('Registro creado', descripcion, 'success');

    }).catch(err=>{
      this.store.dispatch(ui.stopLoading());
      Swal.fire('Error', err.message, 'error');

    })
  }
}
