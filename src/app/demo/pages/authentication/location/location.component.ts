import { Component, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfirmatioModalService } from 'src/app/demo/Services/confirmatio-modal.service';
import { EmployeeService } from 'src/app/demo/Services/employee.service';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent {

  closeResult: any;
  dtOptions: DataTables.Settings = {};
  submitted: any = false;
  deleteLoc: any;
  locationForm: any;
  editlocationForm: any;
  locationValues: any;
  locationData: any;
  addResponse: any;
  empExist: any;
  showLocationTable: boolean = true;
  showDepLoader: boolean = false;

  constructor(private confirmationDialogService: ConfirmatioModalService, private toastr: ToastrService, private employeeservice: EmployeeService, private modalService: NgbModal, public fb: FormBuilder, private activeModal: NgbActiveModal) {

  }

  ngOnInit(): void {
    this.locationForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[A-Za-z ]+$/)]]
    })
    this.editlocationForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[A-Za-z ]+$/)]]
    })
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      responsive: true
    };
    this.getLocationList();
  }

  //location list
  getLocationList() {
    this.showLocationTable = false;
    this.showDepLoader = true;
    this.employeeservice.getLocation().subscribe((res) => {
      this.locationData = res;
      this.showLocationTable = true;
      this.showDepLoader = false;
      if (this.locationData.length > 0) {
        this.dtOptions = this.locationData;
        this.dtOptions = {
          pagingType: 'full_numbers',
          processing: true,
          responsive: true,
          searching: true,
          columnDefs: [{
            "targets": [2, 3],
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

  //get location by id
  getLocationById(id: any) {
    this.employeeservice.getLocationById(id).subscribe((res) => {
      this.locationValues = res;
      this.editlocationForm.patchValue({
        id: this.locationValues.id,
        name: this.locationValues.name,
        // Set other form control values using data from the API
      });

    })
  }

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
    this.getLocationById(id);
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
    return this.locationForm.controls
  }
//edit form control
  get g() {
    return this.editlocationForm.controls
  }

  //add location form submit
  onLocationSubmit() {
    this.submitted = true;
    //if its is invalid, break here
    if (this.locationForm.invalid) {
      return;
    }
    //form input format
    this.employeeservice.addLocation(this.locationForm.value).subscribe((res) => {
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
      this.getLocationList();
    }, (error) => {
      if (error.status == 400) {
        this.showWarningExist(error.error.apiStatusMessage, error.error.result);
      }
      else {
        this.showWarningExist(this.addResponse.apiStatusMessage, this.addResponse.result);
      }
      // Error handling will be done in the catchError operator
    })

    this.modalService.dismissAll();
    this.locationForm.reset();
    this.submitted = false;
  }


  //edit location form
  editLocationSubmit() {

    this.submitted = true;
    //if its is invalid, break here
    if (this.editlocationForm.invalid) {
      return;
    }
    //edit form input format
    this.employeeservice.editLocation(this.editlocationForm.value).subscribe((res) => {
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
      this.getLocationList();
    }, (error) => {
      if (error.status == 400) {
        this.showWarningExist(error.error.apiStatusMessage, error.error.result);
      }
      else{
        this.showWarningExist(this.addResponse.apiStatusMessage, this.addResponse.result);
      }
    })
    this.modalService.dismissAll();
    this.locationForm.reset();
  }

  //delete location
  deleteLocation(id: any, name: any) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete a ' + name + ' location?')
      .then((confirmed) => {
        this.employeeservice.deleteLocation(id).subscribe((res) => {
          this.deleteLoc = res;
          if (this.deleteLoc.apiStatus == 0) {
            this.showDeleteSuccess(name, this.deleteLoc.result);
            this.getLocationList();
          }
        }, (error) => {
          if (error.status == 400) {
            this.empExist = JSON.parse(error.error.result)
            if (this.empExist.length > 0) {
              if (this.empExist.length == 1) {
                this.showWarningExist(error.error.apiStatusMessage, 'Employee ' + this.empExist[0].FirstName + ' in this location');
              }
              else {
                this.showWarningExist(error.error.apiStatusMessage, '' + this.empExist.length + ' employees are in this location');
              }
            }
          }
          else {
            this.showerrorAdd("Error while delete a Location", 'Something Wrong!')
          }
          // Error handling will be done in the catchError operator
        })
      }
      )
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  //activate location
  activeLocation(id: any, name: any) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to activate a ' + name + ' location?')
      .then((confirmed) => {
        this.employeeservice.activateLocation(id).subscribe((res) => {
          this.deleteLoc = res;
          if (this.deleteLoc.apiStatus == 0) {
            this.showDeleteSuccess(name, this.deleteLoc.result);
            this.getLocationList();
          }
        }, (error) => {
          if (error.status == 400) {
            this.showWarningExist(error.error.apiStatusMessage, error.error.result);
          }
          else {
            this.showerrorAdd("Error while activate a Location", 'Something Wrong!')
          }
          // Error handling will be done in the catchError operator
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
  showerrorAdd(msg: any, result: any) {
    this.toastr.error(result, msg);
  }
}
