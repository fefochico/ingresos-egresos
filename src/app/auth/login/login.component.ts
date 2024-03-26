import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { isLoading, stopLoading } from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ''
})
export class LoginComponent implements OnInit,OnDestroy{

  loginForm!: FormGroup;
  cargando:boolean=false;
  uiSubscription!: Subscription;
  constructor(private store:Store<AppState>, private fb: FormBuilder, private authService: AuthService, private router: Router){}
  
  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loginForm= this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.uiSubscription= this.store.select('ui').subscribe(ui=>{
      this.cargando= ui.isLoading;
    })
  }

  loginUsuario(){
    if(this.loginForm.invalid) return;
    this.store.dispatch(isLoading());
    /*Swal.fire({
      title: "Espere por favor",
      didOpen: ()=>{
        Swal.showLoading();
      },
    });*/
    const {email, password}= this.loginForm.value;
    this.authService.login(email, password)
    .then(credenciales=>{
      console.log(credenciales);
      //Swal.close();
      this.store.dispatch(stopLoading())
      this.router.navigate(['/dashboard']);
    }).catch(err=> {
      console.log(err)
      this.store.dispatch(stopLoading())
      Swal.fire({
        title: "Opss...",
        text: err.message,
        icon: "error"
      });
    })
  }
}
