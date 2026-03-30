import { Routes } from '@angular/router';
import { Public } from './public/public';
import { Dashboard } from './dashboard/dashboard';
import { Layout } from './dashboard/layout/layout';
import { Login } from './dashboard/login/login';
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
      { path: 'login', component: Login },



      {
        path: '',
        component: Dashboard, 
        canActivateChild: [authGuard],
        children: [
          { path: '', component: Layout }
        ]
      },
    ]
  }
];
