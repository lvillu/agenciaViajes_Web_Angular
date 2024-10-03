import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from 'src/app/features/auth/service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const isAuthenticated = authService.isAuthenticated();

  if (isAuthenticated) {
    return true; // Allow access to the route
  } else {
    return false; // Deny access to the route
  }
};
