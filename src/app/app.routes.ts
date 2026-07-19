import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./components/pages/sessions/sessions.component')
      .then(m => m.SessionsComponent),
  },
  {
    path: ':id',
    pathMatch: 'full',
    loadComponent: () => import('./components/pages/session/session.component')
      .then(m => m.SessionComponent),
  },
];
