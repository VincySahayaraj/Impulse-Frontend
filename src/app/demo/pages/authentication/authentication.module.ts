import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from "angular-datatables";
import { AuthenticationRoutingModule } from './authentication-routing.module';
// import { MatIconModule } from '@angular/material/icon';
 import  TableComponent  from './employees/gridemployee/table/table.component';
// import { GridemployeeComponent } from './employees/gridemployee/gridemployee.component';
// import { EmployeeapprovalComponent } from './employees/employeeapproval/employeeapproval.component';
 import  ViewemployeeComponent  from './employees/viewemployee/viewemployee.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DepartmentComponent } from './department/department.component';
import { DesignationComponent } from './designation/designation.component';
import { LocationComponent } from './location/location.component';
import { SubDepartmentComponent } from './sub-department/sub-department.component';
import { CompanyComponent } from './company/company.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { QualificationComponent } from './qualification/qualification.component';



// import { EmployeeComponent } from './employee/employee.component';

@NgModule({
  declarations: [
    // EmployeeComponent
  
    
  
    // EmployeeapprovalComponent
  
    // GridemployeeComponent
   
    // MatIconModule 
    
  
    
  
    
  
    
  
   
 
  

  
    ConfirmationModalComponent,
   
   
  ],
  imports: [CommonModule, AuthenticationRoutingModule,BrowserAnimationsModule,DataTablesModule,ToastrModule.forRoot()]
})
export class AuthenticationModule {}
