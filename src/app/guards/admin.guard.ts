import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router);
const token = localStorage.getItem('adminToken');

if (token && token !== 'null' && token.trim() !== '') {
    return true;
  }


 router.navigate(
    ['/admin/login'],
    { queryParams: { returnUrl: state.url } }
  );
  return false;

  
};
