import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as ingresosEgresosActions from '../shared/redux/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: ''
})
export class DashboardComponent implements OnInit, OnDestroy {
  private userSubs!: Subscription;
  private ingresosSubs!: Subscription;

  constructor(private store: Store<AppState>, private ingresoEgresoService: IngresoEgresoService){}
  


  ngOnInit(): void {
    this.userSubs= this.store.select('user')
    .pipe(filter(auth => auth.user != null)) //lo dejamos pasar si no es nulo
    .subscribe(({user}: any)=>{
      this.ingresosSubs= this.ingresoEgresoService.initIngresosEgresosListener(user.uid)
      .subscribe(
        ingresosEgresosFB => {
          this.store.dispatch(ingresosEgresosActions.setItem({items: ingresosEgresosFB}));
        }
      )
    })
  }

  ngOnDestroy(): void {
    this.userSubs?.unsubscribe();
    this.ingresosSubs?.unsubscribe();
  }
}
