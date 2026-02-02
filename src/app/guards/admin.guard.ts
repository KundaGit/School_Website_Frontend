import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router);

  const isLoggedIn = localStorage.getItem('adminLoggedIn');

  if (isLoggedIn === 'true') {
    return true;
  }

  router.navigate(['/admin/login']);
  return false;
};
