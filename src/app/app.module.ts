import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { DataTablesModule } from "angular-datatables";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { NavigationItem } from './theme/layout/admin/navigation/navigation';
import { NavBarComponent } from './theme/layout/admin/nav-bar/nav-bar.component';
import { NavLeftComponent } from './theme/layout/admin/nav-bar/nav-left/nav-left.component';
import { NavRightComponent } from './theme/layout/admin/nav-bar/nav-right/nav-right.component';
import { NavigationComponent } from './theme/layout/admin/navigation/navigation.component';
import { NavLogoComponent } from './theme/layout/admin/nav-bar/nav-logo/nav-logo.component';
import { NavContentComponent } from './theme/layout/admin/navigation/nav-content/nav-content.component';
import { NavGroupComponent } from './theme/layout/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavCollapseComponent } from './theme/layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavItemComponent } from './theme/layout/admin/navigation/nav-content/nav-item/nav-item.component';
import { SharedModule } from './theme/shared/shared.module';
import { ConfigurationComponent } from './theme/layout/admin/configuration/configuration.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { TogglebuttonComponent } from './demo/pages/materials/togglebutton/togglebutton.component';
import ViewemployeeComponent from './demo/pages/authentication/employees/viewemployee/viewemployee.component';
import { AuthenticationModule } from './demo/pages/authentication/authentication.module';
import TableComponent from './demo/pages/authentication/employees/gridemployee/table/table.component';
import GridemployeeComponent from './demo/pages/authentication/employees/gridemployee/gridemployee.component';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';
import SamplePageComponent from './demo/sample-page/sample-page.component';
import EmployeeComponent from './demo/pages/authentication/employees/employee/addemployee.component';
import { SalaryslabComponent } from './demo/pages/authentication/salary/salaryslab/salaryslab.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './demo/pages/authentication/employees/login/login.component';
import { DepartmentComponent } from './demo/pages/authentication/department/department.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LocationComponent } from './demo/pages/authentication/location/location.component';
import { DesignationComponent } from './demo/pages/authentication/designation/designation.component';
import { SubDepartmentComponent } from './demo/pages/authentication/sub-department/sub-department.component';
import { CompanyComponent } from './demo/pages/authentication/company/company.component';
import { ToastrModule } from 'ngx-toastr';
import { DegreeComponent } from './demo/pages/authentication/degree/degree.component';
import { QualificationComponent } from './demo/pages/authentication/qualification/qualification.component';
//  import TableComponent  from './demo/pages/authentication/employees/gridemployee/table/table.component';
// import {MatButtonToggleModule} from '@angular/material/button-toggle';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    NavBarComponent,
    NavLeftComponent,
    NavRightComponent,
    NavigationComponent,
    NavLogoComponent,
    NavContentComponent,
    NavGroupComponent,
    NavItemComponent,
    NavCollapseComponent,
    ConfigurationComponent,
    GuestComponent,
    ViewemployeeComponent,
    TableComponent,
    GridemployeeComponent,
    TogglebuttonComponent,
    SamplePageComponent,
    EmployeeComponent,
    SalaryslabComponent,
    LoginComponent,
    DepartmentComponent,
    LocationComponent,
    DesignationComponent,
    SubDepartmentComponent,
    CompanyComponent,
    QualificationComponent,
    DegreeComponent
    // TableComponent
   
  ],
  
  imports: [BrowserModule, AppRoutingModule, SharedModule, BrowserAnimationsModule,DataTablesModule,HttpClientModule, ReactiveFormsModule,ToastrModule.forRoot()],
  providers: [NavigationItem,NgbActiveModal,
    HttpClientModule],
  bootstrap: [AppComponent],
  
 
})

export class AppModule {}
