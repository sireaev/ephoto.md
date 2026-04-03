import { Routes } from '@angular/router';
import { Public } from './public/public';
import { authGuard } from './dashboard/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: Public,
    title: 'Home Page',
  },
  {
    path: 'admin',
    children: [
      { path: 'login', loadComponent: () => import('./dashboard/login/login').then((m) => m.Login) },



      {
        path: '',
        loadComponent: () => import('./dashboard/dashboard').then((m) => m.Dashboard),
        canActivateChild: [authGuard],
        children: [
          { path: '',  loadComponent: () => import('./dashboard/main-content/main-content').then((m) => m.MainContent), },
          { path: 'events',  loadComponent: () => import('./dashboard/events/events').then((m) => m.Events), },
          { path: 'categories',  loadComponent: () => import('./dashboard/categories/categories').then((m) => m.Categories), },
          { path: 'photo-management/:eventId',  loadComponent: () => import('./dashboard/photo-management/photo-management').then((m) => m.PhotoManagement), },
          { path: 'clients',  loadComponent: () => import('./dashboard/clients/clients').then((m) => m.Clients), },
          { path: 'reviews',  loadComponent: () => import('./dashboard/reviews/reviews').then((m) => m.Reviews), },
          { path: 'prices',  loadComponent: () => import('./dashboard/prices/prices').then((m) => m.Prices), }
        ]
      },
    ]
  }
];
