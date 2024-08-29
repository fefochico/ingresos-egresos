import { CanActivateFn, CanLoadFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { take, tap } from 'rxjs';

export const AuthGuard: CanActivateFn = function(route, state) {
  const authService = inject(AuthService);
  const router= inject(Router);


  return authService.isAuth().pipe(tap(estado=> {
    if(!estado) router.navigate(['login']);
  }));
};

export const AuthGuardLoad: CanLoadFn = function(route, state) {
  const authService = inject(AuthService);
  const router= inject(Router);


  return authService.isAuth().pipe(tap(estado=> {
    if(!estado) router.navigate(['login']);
  }),take(1));
};