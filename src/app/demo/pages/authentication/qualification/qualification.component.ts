import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfirmatioModalService } from 'src/app/demo/Services/confirmatio-modal.service';
import { EmployeeService } from 'src/app/demo/Services/employee.service';

@Component({
  selector: 'app-qualification',
  templateUrl: './qualification.component.html',
  styleUrls: ['./qualification.component.scss']
})
export class QualificationComponent {
  
  closeResult: any;
  dtOptions: DataTables.Settings = {};
  submitted: any = false;
  qualificationForm: any;
  addResponse: any;
  editqualificationForm: any;
  qualificationData: any;
  qualifiValues: any;
  deleteQualifi: any;
  showqualificationTable: boolean = false;
  showDepLoader:boolean=false;

  constructor(private confirmationDialogService: ConfirmatioModalService, private toastr: ToastrService, private employeeservice: EmployeeService, private modalService: NgbModal, public fb: FormBuilder, private activeModal: NgbActiveModal) {

  }

  ngOnInit(): void {
    this.qualificationForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[A-Za-z-. ]+$/)]]
    })
    this.editqualificationForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.maxLength(50),Validators.pattern(/^[A-Za-z-. ]+$/)]]
    })

    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      searching: true,
      responsive: true
    };

    //list call
    this.getQualificationList();

  }

  //all qualification list
  getQualificationList() {

    this.showqualificationTable = false;
    this.showDepLoader=true;
    this.employeeservice.getQualifications().subscribe((res) => {

      this.qualificationData = res;
      this.showqualificationTable = true;
      this.showDepLoader=false;
      if (this.qualificationData.length > 0) {
        this.dtOptions = this.qualificationData;
        this.dtOptions = {
          pagingType: 'full_numbers',
          processing: true,
          responsive: true,
          searching: true,
          columnDefs: [ {
            "targets": [2,3],
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

  //get qualification by id
  getQualificationById(id: any) {
    this.employeeservice.getQualificationById(id).subscribe((res) => {
      this.qualifiValues = res;
      this.editqualificationForm.patchValue({
        id: this.qualifiValues.id,
        name: this.qualifiValues.name,
        // Set other form control values using data from the API
      });
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
    this.getQualificationById(id);
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
    return this.qualificationForm.controls
  }

  //edit form controls
  get g() {
    return this.editqualificationForm.controls
  }

  //create department
  onQualificationSubmit() {
    this.submitted = true;
    //if its is invalid, break here
    if (this.qualificationForm.invalid) {
      return;
    }
    this.employeeservice.addQualification(this.qualificationForm.value).subscribe((res) => {
      this.addResponse = res;
      //success or failure based on the apistatus
      if (this.addResponse.apiStatus == 0) {
        this.toastr.success(this.addResponse.result);
      }
      else if (this.addResponse.apiStatus == 4) {
        this.showWarningExist(this.addResponse.apiStatusMessage, this.addResponse.result);
      }
      else {
        this.showWarningExist(this.addResponse.apiStatusMessage, this.addResponse.result);
      }
      this.getQualificationList();
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
    this.qualificationForm.reset();
    this.submitted=false;
  }

  //edit form submission
  onEditQualificationSubmit() {
    this.submitted = true;
     //if its is invalid, break here
    if (this.editqualificationForm.invalid) {
      return;
    }
    this.employeeservice.editQualification(this.editqualificationForm.value).subscribe((res) => {
      this.addResponse = res;
       //success or failure based on the apistatus
      if (this.addResponse.apiStatus == 0) {
        this.toastr.success(this.addResponse.result);
        this.getQualificationList();
      }
      else{
        this.showWarningExist(this.addResponse.apiStatusMessage, this.addResponse.result);
      }

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
    this.editqualificationForm.reset();
  }


  //delete qualification
  deleteQualification(id: any, name: any) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete a ' + name + ' qualification?')
      .then((confirmed) => {
        this.employeeservice.deleteQualification(id).subscribe((res) => {
          this.deleteQualifi = res;
          if (this.deleteQualifi.apiStatus == 0) {
            this.showDeleteSuccess(name);
            this.getQualificationList();
          }
        })
      }
      )
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }


  //active qualification
  activateQualification(id: any, name: any) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to activate a ' + name + ' qualifcation?')
      .then((confirmed) => {
        this.employeeservice.activateQualification(id).subscribe((res) => {
          this.deleteQualifi = res;
          if (this.deleteQualifi.apiStatus == 0) {
            this.showActivateSuccess(name);
            this.getQualificationList();
          }
        })
      }
      )
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }


  //toaster
  showDeleteSuccess(name) {
    this.toastr.success(name+" qualification is deleted Successfully");
  }
  showActivateSuccess(name:any) {
    this.toastr.success(name+" qualification is activated Successfully");
  }
  showWarningExist(msg: any, result: any) {
    this.toastr.error(result, msg);
  }
}
