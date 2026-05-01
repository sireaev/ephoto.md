import { inject } from '@angular/core';
import { CanActivateFn, CanActivateChildFn, Router } from '@angular/router';
import { environment } from '../../environments/environment';

function isAuthenticated(): boolean {
  return !!localStorage.getItem('access_token');
}

// Protect single routes
export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (!isAuthenticated()) {
    router.navigate([`${environment.path}/login`]);
    return false;
  }

  return true;
};

// Protect child routes (better for layouts)
export const authChildGuard: CanActivateChildFn = () => {
  const router = inject(Router);

  if (!isAuthenticated()) {
    router.navigate([`${environment.path}/login`]);
    return false;
  }

  return true;
};