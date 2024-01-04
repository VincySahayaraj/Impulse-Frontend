import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import EmployeeComponent from './employees/employee/addemployee.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./login/login.component')
      },
      {
        path: 'register',
        loadComponent: () => import('./register/register.component')
      },
      // {
      //   path: 'addemployee',
      //   loadComponent: () => import('./employees/employee/addemployee.component')
      // },
      {
        path: 'addemployee',
        component:EmployeeComponent
      },
      {
        path: 'viewemployee',
        loadComponent: () => import('./employees/viewemployee/viewemployee.component')
      },
      {
        path: 'gridemployee',
        loadComponent: () => import('./employees/gridemployee/gridemployee.component')
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {}
