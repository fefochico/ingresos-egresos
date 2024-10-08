import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ''
})
export class SidebarComponent implements OnInit, OnDestroy{
  public username!: string;
  private userSubs!: Subscription;
  constructor(private authService: AuthService, private router: Router, private store: Store<AppState>){
  }
  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }
  ngOnInit(): void {
    this.userSubs= this.store.select('user')
    .pipe(filter(({user})=>user!=null))
    .subscribe(({user})=>{
      this.username= user!.nombre
    })
  }

  logout(){this.authService.logout().then(()=> this.router.navigate(['/login']))}
}
