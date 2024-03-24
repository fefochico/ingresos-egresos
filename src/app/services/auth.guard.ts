import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = function(route, state) {
  const authService = inject(AuthService);
  const router= inject(Router);


  return authService.isAuth().pipe(tap(estado=> {
    if(!estado) router.navigate(['login']);
  }));
};
