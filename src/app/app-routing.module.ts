import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import ViewemployeeComponent from './demo/pages/authentication/employees/viewemployee/viewemployee.component';
import GridemployeeComponent from './demo/pages/authentication/employees/gridemployee/gridemployee.component';
import SamplePageComponent from './demo/sample-page/sample-page.component';
import EmployeeComponent from './demo/pages/authentication/employees/employee/addemployee.component';
import { SalaryslabComponent } from './demo/pages/authentication/salary/salaryslab/salaryslab.component';
import { LoginComponent } from './demo/pages/authentication/employees/login/login.component';
import { DepartmentComponent } from './demo/pages/authentication/department/department.component';
import { DesignationComponent } from './demo/pages/authentication/designation/designation.component';
import { LocationComponent } from './demo/pages/authentication/location/location.component';
import { SubDepartmentComponent } from './demo/pages/authentication/sub-department/sub-department.component';
import { CompanyComponent } from './demo/pages/authentication/company/company.component';
import { DegreeComponent } from './demo/pages/authentication/degree/degree.component';
import { QualificationComponent } from './demo/pages/authentication/qualification/qualification.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/default',
        pathMatch: 'full'
      },
      {
        path: 'default',
        loadComponent: () => import('./demo/default/default.component')
      },
      {
        path: 'typography',
        loadComponent: () => import('./demo/elements/typography/typography.component')
      },
      {
        path: 'color',
        loadComponent: () => import('./demo/elements/element-color/element-color.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/sample-page/sample-page.component')
      },
      // {
      //   path: 'addemployee',
      //   loadComponent: () => import('./demo/pages/authentication/employees/employee/addemployee.component')
      // },
      // {
      //   path: 'viewemployee',
      //   loadComponent: () => import('./demo/pages/authentication/employees/viewemployee/viewemployee.component')
      // },
      {
        path:'viewemployee',
        component:ViewemployeeComponent
      },
      {
        path:'gridemployee',
        component:GridemployeeComponent
      },
      
      {
        path:'addemployee',
        component:EmployeeComponent
      },
      {
        path:'salaryslab',
        component:SalaryslabComponent
      },
      {
        path:'department',
        component:DepartmentComponent
      },
      {
        path:'subdepartment',
        component:SubDepartmentComponent
      },
      {
        path:'designation',
        component:DesignationComponent
      },
      {
        path:'degree',
        component:DegreeComponent
      },
      {
        path:'qualification',
        component:QualificationComponent
      },
      {
        path:'location',
        component:LocationComponent
      },
      {
        path:'company',
        component:CompanyComponent
      },
      // {
      //   path: 'gridemployee',
      //   loadComponent: () => import('./demo/pages/authentication/employees/gridemployee/gridemployee.component')
      // },
      {
        path: 'employeeapproval',
        loadComponent: () => import('./demo/pages/authentication/employees/employeeapproval/employeeapproval.component')
      },
      {
        path: 'table',
        loadComponent: () => import('./demo/pages/authentication/employees/gridemployee/table/table.component')
      },
    ]
  },
 
  {
    path:'login',
    component:LoginComponent
  },
  {
    path: 'guest',
    component: GuestComponent,
    children: [
      {
        path: '',
        redirectTo: '/default',
        pathMatch: 'full'
      },
      {
        path: 'default',
        loadComponent: () => import('./demo/default/default.component')
      },
      {
        path:'sample',
        component:SamplePageComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
