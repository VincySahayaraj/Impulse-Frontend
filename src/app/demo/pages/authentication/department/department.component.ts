import { Component, Input, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/demo/Services/employee.service';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfirmatioModalService } from 'src/app/demo/Services/confirmatio-modal.service';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent {

  closeResult: any;
  dtOptions: DataTables.Settings = {};
  submitted: any = false;
  departmentForm: any;
  addResponse: any;
  editDepartmentForm: any;
  departmentData: any;
  depValues: any;
  deleteDep: any;
  empExist: any;
  showDepTable: boolean = false;
  showDepLoader:boolean=true;

  constructor(private confirmationDialogService: ConfirmatioModalService, private toastr: ToastrService, private employeeservice: EmployeeService, private modalService: NgbModal, public fb: FormBuilder, private activeModal: NgbActiveModal) {

  }

  ngOnInit(): void {
    this.departmentForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[A-Za-z ]+$/)]]
    })
    this.editDepartmentForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[A-Za-z ]+$/)]]
    })

    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      searching: true,
      responsive: true
    };

    //list call
    this.getDepartmentList();
  }


  //all departments list
  getDepartmentList() {

    this.showDepTable = false;
    this.showDepLoader=true;
    this.employeeservice.getDepartments().subscribe((res) => {
      this.departmentData = res;
      this.showDepLoader=false;
      this.showDepTable = true;
      if (this.departmentData.length > 0) {
        this.dtOptions = this.departmentData;
        this.dtOptions = {
          pagingType: 'full_numbers',
          processing: true,
          responsive: true,
          searching: true,
          columnDefs: [ {
            "targets": [2,3],
            "orderable": false
            } ],
          order:[] 
        };
      }
      else {
        return
      }
    })
  }

  //get department by id
  getDepartmentById(id: any) {

    this.employeeservice.getDepartmentById(id).subscribe((res) => {
      this.depValues = res;
      this.editDepartmentForm.patchValue({
        id: this.depValues.id,
        name: this.depValues.name,
        // Set other form control values using data from the API
      });
    },(error) => {
      if (error.status == 400) {
        this.showWarningExist(error.error.apiStatusMessage, error.error.result);
      }
    // Error handling will be done in the catchError operator
    })
  }

  //Add Modal
  openAddModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  //edit Modal
  openEditModal(content, id: any) {
    //set values in a modal
    this.getDepartmentById(id);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  //add form controls
  get f() {
    return this.departmentForm.controls
  }

  //edit form controls
  get editform() {
    return this.editDepartmentForm.controls
  }

  //create department
  onDepartmentSubmit() {
    this.submitted = true;
    //if its is invalid, break here
    if (this.departmentForm.invalid) {
      return;
    }
    this.employeeservice.addDepartment(this.departmentForm.value).subscribe((res) => {
      this.addResponse = res;
      if (this.addResponse.apiStatus == 0) {

        this.toastr.success(this.addResponse.result);
      
      }
      else if (this.addResponse.apiStatus == 4) {
        this.showWarningExist(this.addResponse.apiStatusMessage, this.addResponse.result);
      }
      else {
        this.showWarningExist(this.addResponse.apiStatusMessage, this.addResponse.result);
      }
      this.getDepartmentList();
    }, (error) => {
      if (error.status == 400) {
        this.showWarningExist(error.error.apiStatusMessage, error.error.result);
      }
    // Error handling will be done in the catchError operator
    })
    this.modalService.dismissAll();
     this.departmentForm.reset();
     this.submitted=false;
  }

  //edit form submission
  editDepartmentSubmit() {
    this.submitted = true;
    if (this.editDepartmentForm.invalid) {
      return;
    }
    this.employeeservice.editDepartment(this.editDepartmentForm.value).subscribe((res) => {
      this.addResponse = res;
      if (this.addResponse.apiStatus == 0) {
        this.toastr.success(this.addResponse.result);
        this.getDepartmentList();
      }
      else{
        this.toastr.error(this.addResponse.result);
      }
    }, (error) => {
      if (error.status == 400) {
        this.showWarningExist(error.error.apiStatusMessage, error.error.result);
      }
      else{
        this.showWarningExist(error.error.apiStatusMessage, error.error.result);
      }
      // Error handling will be done in the catchError operator
    })
    this.modalService.dismissAll(); 
  }


  //delete department
  deleteDepartment(id: any, name: any) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete a ' + name + ' department?')
      .then((confirmed) => {
        this.employeeservice.deleteDepartment(id).subscribe((res) => {
          this.deleteDep = res;
          if (this.deleteDep.apiStatus == 0) {
            this.showDeleteSuccess(name);
            this.getDepartmentList();
          }
          else{
            this.showWarningExist(this.deleteDep.apiStatusMessage,this.deleteDep.result);
          }
        },(error) => {
            if (error.status == 400) {
              this.empExist = JSON.parse(error.error.result)
              if (this.empExist.length > 0) {
                if (this.empExist.length == 1) {
                  this.showWarningExist(error.error.apiStatusMessage, 'Employee ' + this.empExist[0].FirstName + ' in this department');
                }
                else {
                  this.showWarningExist(error.error.apiStatusMessage, '' + this.empExist.length + 'employees are in this department');
                }
              }
            }
            // Error handling will be done in the catchError operator
          })
      }
      )
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  //active department
  activeDepartment(id: any, name: any) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to activate a ' + name + ' department?')
      .then((confirmed) => {
        this.employeeservice.activeDepartment(id).subscribe((res) => {
          this.deleteDep = res;
          if (this.deleteDep.apiStatus == 0) {
            this.showActivateSuccess(name);
            this.getDepartmentList();
          }
        })
      }
      )
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  //toaster
  showDeleteSuccess(name:any) {
    this.toastr.success(name+" department is deleted Successfully");
  }
  showWarningExist(msg: any, result: any) {
    this.toastr.error(result, msg);
  }
  showActivateSuccess(name:any){
    this.toastr.success(name+" department is Activated Successfully");
  }
}
