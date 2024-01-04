import { Component, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfirmatioModalService } from 'src/app/demo/Services/confirmatio-modal.service';
import { EmployeeService } from 'src/app/demo/Services/employee.service';

@Component({
  selector: 'app-degree',
  templateUrl: './degree.component.html',
  styleUrls: ['./degree.component.scss']
})
export class DegreeComponent {

  closeResult: any;
  dtOptions: DataTables.Settings = {};
  submitted: any = false;
  degValues: any;
  degreeData: any;
  qualificationData: any;
  addDegreeForm: any;
  editDegreeForm: any;
  addResponse: any;
  editResponse: any;
  deleteDep: any;
  showdegreeTable: boolean = true;
  showDepLoader: boolean = false;
  qualificationDataActive: any[] = Array();

  constructor(private confirmationDialogService: ConfirmatioModalService, private employeeservice: EmployeeService, private toastr: ToastrService, private modalService: NgbModal, public fb: FormBuilder, private activeModal: NgbActiveModal) {

  }

  ngOnInit(): void {
    //add form
    this.addDegreeForm = this.fb.group({
      qualification: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[A-Za-z ]+$/)]]
    })

    //edit form
    this.editDegreeForm = this.fb.group({
      id: [''],
      qualification: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[A-Za-z ]+$/)]]
    })

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      responsive: true
    };
    this.getQualificationList();
    this.getDegreeList();

  }

  getDegreeList() {

    this.showDepLoader = true;
    this.showdegreeTable = false;
    this.employeeservice.getAllDegree().subscribe((res) => {
      this.degreeData = res;
      this.showdegreeTable = true;
      this.showDepLoader = false
      if (this.degreeData.length > 0) {
        this.dtOptions = this.degreeData;
        this.dtOptions = {
          pagingType: 'full_numbers',
          processing: true,
          responsive: true,
          searching: true,
          columnDefs: [{
            "targets": [3, 4],
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

  //all qualification list for dropdown
  getQualificationList() {
    this.employeeservice.getQualifications().subscribe((res) => {
      this.qualificationData = res;
      this.qualificationData.forEach(element => {
        if (element.isActive === 1) {
          this.qualificationDataActive.push(element)
        }
      });
    })
  }

  //get degree by id
  getDegreeById(id: any) {
    this.employeeservice.getDegreeById(id).subscribe((res) => {
      this.degValues = res;
      this.editDegreeForm.patchValue({
        qualification: this.degValues.qualifications.id,
        name: this.degValues.name,
        id: this.degValues.id
        // Set other form control values using data from the API
      });
    })
  }

  //add degree modal
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
    this.getDegreeById(id);
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
    return this.addDegreeForm.controls
  }

  //edit form control
  get g() {
    return this.editDegreeForm.controls
  }

  //add form submit
  onDegreeSubmit() {
    this.submitted = true;
    //form is invalid, then break here
    if (this.addDegreeForm.invalid) {
      return;
    }

    //input format
    const degree = {
      name: this.addDegreeForm.value.name,
      qualifications: {
        id: this.addDegreeForm.value.qualification
      }
    }

    this.employeeservice.addDegree(degree).subscribe((res) => {
      this.addResponse = res;
      //show success or failure based on the api status
      if (this.addResponse.apiStatus == 0) {
        this.toastr.success(this.addResponse.result);
      }
      else if (this.addResponse.apiStatus == 2) {
        this.showWarningExist(this.addResponse.apiStatusMessage,this.addResponse.result);
      }
      else if (this.addResponse.apiStatus == 4) {
        this.showWarningExist(this.addResponse.apiStatusMessage, this.addResponse.result);
      }
      else {
        this.showWarningExist(this.addResponse.apiStatusMessage, this.addResponse.result);
      }
      this.getDegreeList();
    }, (error) => {

      if (error.status == 400) {
        this.showWarningExist(error.error.apiStatusMessage, error.error.result);
      }
      // Error handling will be done in the catchError operator
    })
    this.modalService.dismissAll();
    this.addDegreeForm.reset();
    this.submitted = false;
  }


  editDegreeSubmit() {

    this.submitted = true;

    //form is invalid, then break here
    if (this.editDegreeForm.invalid) {
      return;
    }
    //edit input format
    const degree = {
      id: this.editDegreeForm.value.id,
      name: this.editDegreeForm.value.name,
      qualifications: {
        id: this.editDegreeForm.value.qualification
      }
    }

    this.employeeservice.editDegree(degree).subscribe((res) => {
      this.editResponse = res;
      if (this.editResponse.apiStatus == 0) {
        this.toastr.success(this.editResponse.apiStatusMessage);
      }
      else if (this.addResponse.apiStatus == 2) {
        this.showWarningExist(this.addResponse.apiStatusMessage,this.addResponse.result);
      }
      else if (this.addResponse.apiStatus == 4) {
        this.showWarningExist(this.addResponse.apiStatusMessage, this.addResponse.result);
      }
      else {
        this.showWarningExist(this.addResponse.apiStatusMessage, this.addResponse.result);
      }
      this.getDegreeList();
    }
      , (error) => {
        if (error.status == 400) {
          this.showWarningExist(error.error.apiStatusMessage, error.error.result);
        }
        // Error handling will be done in the catchError operator
      })

    this.modalService.dismissAll();
    this.editDegreeForm.reset();
  }


  //delete degree
  deleteDegree(id: any, name: any) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete a ' + name + ' degree?')
      .then((confirmed) => {
        this.employeeservice.deleteDegree(id).subscribe((res) => {
          this.deleteDep = res;
          if (this.deleteDep.apiStatus == 0) {
            this.showDeleteSuccess(name, this.deleteDep.result);
            this.getDegreeList();
          }
        })
      }
      )
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }


  //activate a degree
  activeDegree(id: any, name: any) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to activate a ' + name + ' degree?')
      .then((confirmed) => {
        this.employeeservice.activeDegree(id).subscribe((res) => {
          this.deleteDep = res;
          if (this.deleteDep.apiStatus == 0) {
            this.showDeleteSuccess(name, this.deleteDep.result);
            this.getDegreeList();
          }
        })
      }
      )
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  //toaster
  showDeleteSuccess(name: any, msg: any) {
    this.toastr.success(name + ' ' + msg);
  }
  showWarningExist(msg: any, result: any) {
    this.toastr.error(result, msg);
  }
}
