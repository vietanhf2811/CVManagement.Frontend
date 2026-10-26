import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout')
        .then(m => m.AuthLayout),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/pages/login/login')
            .then(m => m.Login)
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/pages/register/register')
            .then(m => m.Register)
      }
    ]
  }
];