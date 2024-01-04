
import { Component, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { error } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { ConfirmatioModalService } from 'src/app/demo/Services/confirmatio-modal.service';
import { EmployeeService } from 'src/app/demo/Services/employee.service';

@Component({
  selector: 'app-sub-department',
  templateUrl: './sub-department.component.html',
  styleUrls: ['./sub-department.component.scss']
})
export class SubDepartmentComponent {


  closeResult: any;
  dtOptions: DataTables.Settings = {};
  submitted: any = false;
  subdepValues: any;
  subdepartmentData: any;
  departmentData: any;
  subdepartmentForm: any;
  editsubdepartmentForm: any;
  addResponse: any;
  editResponse: any;
  deleteDep: any;
  empExist:any;
  showSubDepTable: boolean = true;
  showDepLoader:boolean;
  departmentDataActive: any[] = Array();

  constructor(private confirmationDialogService: ConfirmatioModalService, private employeeservice: EmployeeService, private toastr: ToastrService, private modalService: NgbModal, public fb: FormBuilder, private activeModal: NgbActiveModal) {

  }

  ngOnInit(): void {
    //add form
    this.subdepartmentForm = this.fb.group({
      department: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[A-Za-z ]+$/)]]
    })

    //edit form
    this.editsubdepartmentForm = this.fb.group({
      id: [''],
      department: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[A-Za-z ]+$/)]]
    })

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      responsive: true
    };
    this.getDepartmentList();
    this.getSubDepartmentList();
  }

  getSubDepartmentList() {

    this.showSubDepTable = false;
    this.showDepLoader=true;
    this.employeeservice.getSubDepartments().subscribe((res) => {
      //table trigger
      this.subdepartmentData = res;
      // loader trigger
      this.showSubDepTable = true;
      this.showDepLoader=false;
      if (this.subdepartmentData.length > 0) {
        this.dtOptions = this.subdepartmentData;
        this.dtOptions = {
          pagingType: 'full_numbers',
          processing: true,
          responsive: true,
          searching: true,
          columnDefs: [ {
            "targets": [3,4],
            "orderable": false
            }],
          order:[] 
        };
      }
      else {
        return
      }
    })
  }

  //all departments list for dropdown
  getDepartmentList() {

    this.employeeservice.getDepartments().subscribe((res) => {
      this.departmentData = res;
      this.departmentData.forEach(element => {
        if (element.isActive === 1) {
          this.departmentDataActive.push(element)
        }
      });
    })
  }

  //get subdepartment by id
  getSubDepartmentById(id: any) {
    this.employeeservice.getSubDepartmentById(id).subscribe((res) => {
      this.subdepValues = res;
        this.editsubdepartmentForm.patchValue({
          department: this.subdepValues.department.id,
          name: this.subdepValues.name,
          id: this.subdepValues.id
          // Set other form control values using data from the API
        });
    })
  }

  //add sub department modal
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
    this.getSubDepartmentById(id);
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

  //add form control
  get f() {
    return this.subdepartmentForm.controls
  }

  //edit form control
  get g() {
    return this.editsubdepartmentForm.controls
  }

  //sub department submit
  onSubDepartmentSubmit() {

    this.submitted = true;
    //if its is invalid, break here
    if (this.subdepartmentForm.invalid) {
      return;
    }

    //edit form input format
    const subDepartment = {
      name: this.subdepartmentForm.value.name,
      department: {
        id: this.subdepartmentForm.value.department
      }
    }

    this.employeeservice.addSubDepartment(subDepartment).subscribe((res) => {
      this.addResponse = res;
      //success or failure based on the apistatus
      if (this.addResponse.apiStatus == 0) {
        this.toastr.success(this.addResponse.result);
      }
      else if (this.addResponse.apiStatus == 2) {
        this.showWarningExist(this.addResponse.apiStatusMessage, this.addResponse.result);
      }
      else if (this.addResponse.apiStatus == 4) {
        this.showWarningExist(this.addResponse.apiStatusMessage, this.addResponse.result);
      }
      else {
        this.showWarningExist(this.addResponse.apiStatusMessage, this.addResponse.result);
      }
      this.getSubDepartmentList();
    }, (error) => {

      if (error.status == 400) {
        this.showWarningExist(error.error.apiStatusMessage, error.error.result);
      }
      else{
        this.showWarningExist(this.addResponse.apiStatusMessage, this.addResponse.result);
      }
      // Error handling will be done in the catchError operator
    })
    this.modalService.dismissAll();
    this.subdepartmentForm.reset();
    this.submitted=false;
  }

  editSubDepartmentSubmit() {
    this.submitted = true;
    //if its is invalid, break here
    if (this.editsubdepartmentForm.invalid) {
      return;
    }

  //edit form input format
    const subDepartment = {
      id: this.editsubdepartmentForm.value.id,
      name: this.editsubdepartmentForm.value.name,
      department: {
        id: this.editsubdepartmentForm.value.department
      }
    }

    this.employeeservice.editSubDepartment(subDepartment).subscribe((res) => {
      this.editResponse = res;
       //success or failure based on the apistatus
      if (this.editResponse.apiStatus == 0) {
        this.toastr.success(this.editResponse.apiStatusMessage);
        this.getSubDepartmentList();
      }
    },(error) => {
        if (error.status == 400) {
          this.showWarningExist(error.error.apiStatusMessage, error.error.result);
        }
        // Error handling will be done in the catchError operator
      })
    this.modalService.dismissAll();
  }

  //delete sub department
  deleteSubDepartment(id: any, name: any) {

    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete a ' + name + ' Sub department?')
      .then((confirmed) => {
        this.employeeservice.deleteSubDepartment(id).subscribe((res) => {
          this.deleteDep = res;
          if (this.deleteDep.apiStatus == 0) {
            this.showDeleteSuccess(name);
            this.getSubDepartmentList();
          }
        }, (error) => {

          if (error.status == 400) {
            this.empExist = JSON.parse(error.error.result)
              if (this.empExist.length > 0) {
                if (this.empExist.length == 1) {
                  this.showWarningExist(error.error.apiStatusMessage, 'Employee ' + this.empExist[0].FirstName + ' in this department');
                }
                else {
                  this.showWarningExist(error.error.apiStatusMessage, '' + this.empExist.length + ' employees are in this department');
                }
              }
          }
          // Error handling will be done in the catchError operator
        })
      }
      )
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }


  //activate sub department
  activateSubDepartment(id: any, name: any) {

    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to activate a ' + name + ' Sub department?')
      .then((confirmed) => {
        console.log('User confirmed:', confirmed)
        this.employeeservice.activateSubDepartment(id).subscribe((res) => {
          console.log("res sub dep",res)
          this.deleteDep = res;
          if (this.deleteDep.apiStatus == 0) {
            this.showActivateSuccess(name);
            this.getSubDepartmentList();
          }
        },(error) => {
          if (error.status == 400) {
            this.showWarningExist(error.error.apiStatusMessage, error.error.result);
          }
          // Error handling will be done in the catchError operator
        })
      }
      )
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  //toaster
  showDeleteSuccess(name:any) {
    this.toastr.success(name + " Subdepartment is deleted successfully");
  }
  showWarningExist(msg: any, result: any) {
    this.toastr.error(result, msg);
  }
  showActivateSuccess(name: any) {
    this.toastr.success(name + " Subdepartment is activated successfully");
  }
}
