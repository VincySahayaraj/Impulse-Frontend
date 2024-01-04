import { Component, Input, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/demo/Services/employee.service';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfirmatioModalService } from 'src/app/demo/Services/confirmatio-modal.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent {
  closeResult: any;
  dtOptions: DataTables.Settings = {};
  submitted: any = false;
  companyForm: any;
  addResponse: any;
  editCompanyForm: any;
  companyData: any;
  depValues: any;
  deleteDep: any;
  showDepTable: boolean = false;
  showDepLoader:boolean;
  empExist:any;

  constructor(private confirmationDialogService: ConfirmatioModalService, private toastr: ToastrService, private employeeservice: EmployeeService, private modalService: NgbModal, public fb: FormBuilder, private activeModal: NgbActiveModal) {

  }

  ngOnInit(): void {
    // add form
    this.companyForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      address: ['', [Validators.required, Validators.maxLength(500)]],
      cin: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[A-Z]{1}[A-Z0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/)]],
      gstin: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[Z]{1}[0-9]{1}$/)]],
      contactNo: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[789]\d{9}$/)]]
    })
    //edit form
    this.editCompanyForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      address: ['', [Validators.required, Validators.maxLength(500)]],
      cin: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[A-Z]{1}[A-Z0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/)]],
      gstin: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[Z]{1}[0-9]{1}$/)]],
      contactNo: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[789]\d{9}$/)]]
    })

    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      searching: true,
      responsive: true
    };

    //list call
    this.getCompanyList();

  }


  //all companies list
  getCompanyList() {

    this.showDepTable = false;
    this.showDepLoader=true;
    this.employeeservice.getCompanyList().subscribe((res) => {

      this.companyData = res;
      this.showDepTable = true;
      this.showDepLoader=false;

      if (this.companyData.length > 0) {
        this.dtOptions = this.companyData;
        this.dtOptions = {
          pagingType: 'full_numbers',
          processing: true,
          responsive: true,
          searching: true,
          // hide edit and delete sort icon
          columnDefs: [{
            "targets": [6, 7],
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

  //get company by id
  getCompanyById(id: any) {
    this.employeeservice.getCompanyById(id).subscribe((res) => {
      this.depValues = res;
      //append values from api to the edit form
      this.editCompanyForm.patchValue({
        id: this.depValues.id,
        name: this.depValues.name,
        address: this.depValues.address,
        cin: this.depValues.cin,
        gstin: this.depValues.gstin,
        contactNo: this.depValues.contactNo
        
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
    this.getCompanyById(id);
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
    return this.companyForm.controls
  }

  //edit form controls
  get g() {
    return this.editCompanyForm.controls
  }


  //create company
  onCompanySubmit() {
    this.submitted = true;
    //if its is invalid, break here
    if (this.companyForm.invalid) {
      return;
    }
    this.employeeservice.addCompany(this.companyForm.value).subscribe((res) => {

      this.addResponse = res;
      //success or failure based on the apistatus
      if (this.addResponse.apiStatus == 0) {
        this.toastr.success(this.addResponse.result);
      }
      else if (this.addResponse.apiStatus == 4) {
        this.showWarningExist(this.addResponse.apiStatusMessage, this.addResponse.result);
      }
      else {
      }
      this.getCompanyList();
    }, (error) => {

      if (error.status == 400) {
        this.showWarningExist(error.error.apiStatusMessage, error.error.result);
       
      }
      // Error handling will be done in the catchError operator
    })
    this.modalService.dismissAll();
    this.companyForm.reset();
    this.submitted=false;
    
  }

  //edit form submission
  editCompanySubmit() {
    this.submitted = true;

    if (this.editCompanyForm.invalid) {
      return;
    }
    this.employeeservice.editCompany(this.editCompanyForm.value).subscribe((res) => {
      this.addResponse = res;
      if (this.addResponse.apiStatus == 0) {
        this.toastr.success("Company is Updated Successfully");
        this.getCompanyList();
      }
    }, (error) => {
      if (error.status == 400) {
        this.showWarningExist(error.error.apiStatusMessage, error.error.result);
      }
      // Error handling will be done in the catchError operator
    })
    this.modalService.dismissAll();
  }


  //delete company
  deleteCompany(id: any, name: any) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete a ' + name + ' company?')
      .then((confirmed) => {
        this.employeeservice.deleteCompany(id).subscribe((res) => {
          this.deleteDep = res;
          if (this.deleteDep.apiStatus == 0) {
            this.showDeleteSuccess(name);
            this.getCompanyList();
          }
        },(error) => {
          if (error.status == 400) {
            this.empExist = JSON.parse(error.error.result)
            if (this.empExist.length > 0) {
              if (this.empExist.length == 1) {
                this.showWarningExist(error.error.apiStatusMessage, 'Employee ' + this.empExist[0].FirstName + ' in this company');
              }
              else {
                this.showWarningExist(error.error.apiStatusMessage, '' + this.empExist.length + ' employees are in this company');
              }
            }
          }
          else{
            this.showWarningExist("Something went wrong","Error!");
          }
          // Error handling will be done in the catchError operator
        })
      }
      )
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  //activate a company
  activateCompany(id: any, name: any) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to activate a ' + name + ' company?')
      .then((confirmed) => {
        this.employeeservice.activateCompany(id).subscribe((res) => {
          this.deleteDep = res;
          if (this.deleteDep.apiStatus == 0) {
            this.showActivateSuccess(name);
            this.getCompanyList();
          }
        },(error) => {
          if (error.status == 400) {
            this.showWarningExist(error.error.apiStatusMessage, error.error.result);
          }
          else{
            this.showWarningExist("Something went wrong","Error!");
          }
          // Error handling will be done in the catchError operator
        })
      }
      )
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  //toaster
  showDeleteSuccess(name: any) {
    this.toastr.success(name + " Company is deleted Successfully");
  }
  showActivateSuccess(name: any) {
    this.toastr.success(name + " Company is activated Successfully");
  }
  showWarningExist(msg: any, result: any) {
    this.toastr.error(result, msg);
  }
}
