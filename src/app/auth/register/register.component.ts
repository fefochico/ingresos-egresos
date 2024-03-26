import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { isLoading, stopLoading } from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy{
  public registroForm!: FormGroup;
  private _uiSubscription!: Subscription;
  public cargando: boolean =false;

  constructor(private store:Store<AppState>, private fb: FormBuilder, private authService: AuthService,
    private router: Router){}
  ngOnDestroy(): void {
    this._uiSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.registroForm= this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
  })
    this._uiSubscription= this.store.select('ui').subscribe(ui=>{
      this.cargando= ui.isLoading;
    })
  }

  crearUsuario(){
    if(this.registroForm.invalid) return;
    /*Swal.fire({
      title: "Espere por favor",
      didOpen: ()=>{
        Swal.showLoading();
      },
    });*/
    this.store.dispatch(isLoading())
    const { nombre, correo, password} = this.registroForm.value;
    this.authService.crearUsuario(
      nombre,
      correo,
      password
    ).then(credenciales=>{
      console.log(credenciales)
      /*Swal.close();*/
      this.store.dispatch(stopLoading())

      this.router.navigate(['/login'])
    }).catch(err=> {
      console.log(err)
      this.store.dispatch(stopLoading())
      Swal.fire({
        title: "Opss...",
        text: err.message,
        icon: "error"
      });
     });
  }

}
