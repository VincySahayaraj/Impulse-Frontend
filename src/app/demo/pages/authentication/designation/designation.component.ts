import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfirmatioModalService } from 'src/app/demo/Services/confirmatio-modal.service';
import { EmployeeService } from 'src/app/demo/Services/employee.service';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.scss']
})
export class DesignationComponent {

  dataSource: any;
  closeResult: any;
  dtOptions: DataTables.Settings = {};
  submitted: any = false;
  showDepLoader: any = false;
  designationForm: any;
  designationResponse: any;
  designationData: any;
  showDesignationTable: any;
  subdepartmentData: any;
  departmentData: any;
  designationValues: any;
  editdesignationForm: any;
  deleteDes: any;
  subdepartmentDataActive: any[] = Array();
  departmentDataActive: any[] = Array();

  // @Input() designationData:any[]=Array();
  constructor(private confirmationDialogService: ConfirmatioModalService, private employeeservice: EmployeeService, private toastr: ToastrService, private modalService: NgbModal, public fb: FormBuilder, private activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {


    this.designationForm = this.fb.group({

      name: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[A-Za-z ]+$/)]],
      department: ['', [Validators.required]],
      subDepartment: ['', [Validators.required]]

    })

    this.editdesignationForm = this.fb.group({

      id: [''],
      name: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[A-Za-z ]+$/)]],
      department: ['', [Validators.required]],
      subDepartment: ['', [Validators.required]]

    })

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      responsive: true
    };
    this.getDesignationList();
    this.getDepartmentList();
    this.getSubDepartmentList();
  }
  //get all designations
  getDesignationList() {
    this.showDesignationTable = false;
    this.showDepLoader = true;
    this.employeeservice.getDesignation().subscribe((res) => {
      this.designationData = res;
      this.showDesignationTable = true;
      this.showDepLoader = false;
      if (this.designationData.length > 0) {
        this.dtOptions = this.designationData;
        this.dtOptions = {
          pagingType: 'full_numbers',
          processing: true,
          responsive: true,
          searching: true,
          columnDefs: [{
            "targets": [4, 5],
            "orderable": false
          }],
          order: []


        };
      }
      else {
        return
      }
    })
  }

  //get designation by Id
  getDesignationById(id: any) {
    this.employeeservice.getDesignationById(id).subscribe((res) => {
      this.designationValues = res;
      this.editdesignationForm.patchValue({
        id: this.designationValues.id,
        name: this.designationValues.name,
        department: this.designationValues.department.id,
        subDepartment: this.designationValues.subDepartment.id
        // Set other form control values using data from the API
      });

    })
  }

  //add modal
  openAddModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  //edit Modal
  openEditModal(content, id: any) {

    this.getDesignationById(id);
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
  get f() {
    return this.designationForm.controls
  }
  get g() {
    return this.editdesignationForm.controls
  }
  //sub department list
  getSubDepartmentList() {
    this.employeeservice.getSubDepartments().subscribe((res) => {
      this.subdepartmentData = res;

      //check and get the active status only
      this.subdepartmentData.forEach(element => {
        if (element.isActive === 1) {
          this.subdepartmentDataActive.push(element)
        }
      });
    })
  }

  //department list
  getDepartmentList() {
    this.employeeservice.getDepartments().subscribe((res) => {
      this.departmentData = res;
      //check and get the active status only
      this.departmentData.forEach(element => {
        if (element.isActive === 1) {
          this.departmentDataActive.push(element)
        }
      });
    })
  }

  //add designation
  onDesignationSubmit() {
    this.submitted = true;
    if (this.designationForm.invalid) {
      return;
    }

    const designation = {
      name: this.designationForm.value.name,
      department: {
        id: this.designationForm.value.department
      },
      subDepartment: {
        id: this.designationForm.value.subDepartment
      }
    }
    this.employeeservice.addDesignation(designation).subscribe((res) => {
      this.designationResponse = res;
      if (this.designationResponse.apiStatus == 0) {
        this.toastr.success(this.designationResponse.result);
      }
      else if (this.designationResponse.apiStatus == 4) {
        this.showWarningExist(this.designationResponse.apiStatusMessage, this.designationResponse.result);
      }
      else {
        this.showWarningExist(this.designationResponse.apiStatusMessage, this.designationResponse.result);
      }
      this.getDesignationList();
    }, (error) => {

      if (error.status == 400) {
        this.showWarningExist(error.error.apiStatusMessage, error.error.result);
      }
      else {
        this.showerrorAdd("Error while Adding a Designation", 'Something Wrong!')
      }
      // Error handling will be done in the catchError operator
    })
    this.modalService.dismissAll();
    this.designationForm.reset();
    this.submitted = false;
  }

  //submit edit form
  onEditDesignationSubmit() {
    this.submitted = true;
    //if its is invalid, break here
    if (this.editdesignationForm.invalid) {
      return;
    }
    //edit form input format
    const designation = {
      id: this.editdesignationForm.value.id,
      name: this.editdesignationForm.value.name,
      department: {
        id: this.editdesignationForm.value.department
      },
      subDepartment: {
        id: this.editdesignationForm.value.subDepartment
      }
    }

    //success or failure based on the apistatus
    this.employeeservice.editDesignation(designation).subscribe((res) => {
      this.designationResponse = res;
      if (this.designationResponse.apiStatus == 0) {
        this.toastr.success(this.designationResponse.result);
      }
      else if (this.designationResponse.apiStatus == 4) {
        this.showWarningExist(this.designationResponse.apiStatusMessage, this.designationResponse.result);
      }
      else {
        this.toastr.error(this.designationResponse.result);
      }
      this.getDesignationList();
    }, (error) => {
      if (error.status == 400) {
        this.showWarningExist(error.error.apiStatusMessage, error.error.result);
      }
      else {
        this.showerrorAdd("Error while Adding a Designation", 'Something Wrong!')
      }
      // Error handling will be done in the catchError operator
    })
    this.modalService.dismissAll();
    this.designationForm.reset();
  }

  //delete designation
  deleteDesignation(id: any, name: any) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete a ' + name + ' designation?')
      .then((confirmed) => {
        this.employeeservice.deleteDesignation(id).subscribe((res) => {
          this.deleteDes = res;
          if (this.deleteDes.apiStatus == 0) {
            this.showDeleteSuccess(name, this.deleteDes.result);
            this.getDesignationList();
          }
        },
          (error) => {

            if (error.status == 400) {
              this.showWarningExist(error.error.apiStatusMessage, error.error.result);
            }
            else {
              this.showerrorAdd("Error while delete a Designation", 'Something Wrong!')
            }
            // Error handling will be done in the catchError operator
          })
      }
      )
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  activateDesignation(id: any, name: any) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete a ' + name + ' designation?')
      .then((confirmed) => {
        this.employeeservice.activateDesignation(id).subscribe((res) => {
          this.deleteDes = res;
          if (this.deleteDes.apiStatus == 0) {
            this.showDeleteSuccess(name, this.deleteDes.result);
            this.getDesignationList();
          }
        },
          (error) => {
            if (error.status == 400) {
              this.showWarningExist(error.error.apiStatusMessage, error.error.result);
            }
            else {
              this.showerrorAdd("Error while delete a Designation", 'Something Wrong!')
            }
            // Error handling will be done in the catchError operator
          })
      }
      )
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  showWarningExist(msg: any, result: any) {
    this.toastr.error(result, msg);
  }
  showerrorAdd(msg: any, result: any) {
    this.toastr.error(result, msg);
  }
  //toaster
  showDeleteSuccess(name: any, result: any) {
    this.toastr.success(name + ' ' + result);
  }
}
