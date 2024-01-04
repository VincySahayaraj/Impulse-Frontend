import { Component } from '@angular/core';

import { FormControl, FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { EmployeeService } from 'src/app/demo/Services/employee.service';
@Component({
  selector: 'app-employee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.scss'],

})
export default class EmployeeComponent {

  // name = "Angular";
  employeeForm: any;
  educationValue: any[] = Array();
  reference: any;
  education: any;
  experience: any;
  referral: any;
  totalForm: any;
  public showForm = {
    personal: true,
    education: false,
    work: true
  }
  submitted: any = false;
  BloodGroupList: any = ['A+ve', 'A-ve', 'B+ve', 'B-ve', 'AB+ve', 'AB-ve', 'O+ve', 'O-ve'];
  typeList:any=['Employment','Internship']


  allCompanies:any;
  allDesignation:any;
  allDepartments:any;
  allSubDepartments:any;
  allLocation:any;
  allQualification:any;
  allDegree:any;

  constructor(public fb: FormBuilder, private employeeservice: EmployeeService) { }

  ngOnInit() {
    this.getCompaniesList();
    this.getDepartments();
    this.getSubDepartments();
    this.getLocation();
    this.getSubDepartments();
    this.getDesignation();
    this.getQualification();
    this.getDegree();
    var acc = document.getElementsByClassName("accordion");
    var panel = document.getElementsByClassName("panel");

    for (var i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        var setClasses = !this.classList.contains("active");
        setClass(acc, "active", "remove");
        setClass(panel, "show", "remove");

        if (setClasses) {
          this.classList.toggle("active");
          this.nextElementSibling.classList.toggle("show");
        }
      });
    }

    function setClass(els, className, fnName) {
      for (var i = 0; i < els.length; i++) {
        els[i].classList[fnName](className);
      }
    }

    this.employeeForm = this.fb.group({

      personal: this.fb.group({

        FirstName: ["", [Validators.required, Validators.maxLength(50), Validators.pattern(/^[A-Za-z ]+$/)]],
        LastName: ["", [Validators.required, Validators.maxLength(50), , Validators.pattern(/^[A-Za-z ]+$/)]],
        BloodGroup: [""],
        Gender: ["", Validators.required],
        OfficialDOB: ["", Validators.required],
        ActualDOB: ["", Validators.required],
        PersonalEmail: ["", [Validators.required, Validators.maxLength(50), Validators.pattern(/^\s*\S+@\S+\.\S+\s*$/)]],
        OfficialEmail: ["", [Validators.required, Validators.maxLength(50), Validators.pattern(/^\s*\S+@\S+\.\S+\s*$/)]],
        ContactNo: ["", [Validators.required, Validators.maxLength(10), Validators.pattern(/^(?!0+$|1+$)\d{10}$/)]],
        MaritalStatus: ["", Validators.required],
        Address: ["", [Validators.required, Validators.maxLength(100)]],
        EmergencyContactPerson: ["", [Validators.maxLength(50), Validators.pattern(/^[A-Za-z ]+$/)]],
        EmergencyContactRelation: ["", [Validators.maxLength(50), Validators.pattern(/^[A-Za-z ]+$/)]],
        EmergencyContactNo: ["", [Validators.maxLength(10), Validators.pattern(/^(?!0+$|1+$)\d{10}$/)]],
        AadharNo: ["", [Validators.required, Validators.maxLength(16), Validators.pattern("^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$")]],
        PanNo: ["", [Validators.pattern("[A-Z]{5}[0-9]{4}[A-Z]{1}")]],
      }),
      reference: this.fb.group({
        Code: ["", Validators.required],
        ReferralDuration: ["", Validators.required],
      }),
      company: this.fb.group({
        DepartmentID: ["", [Validators.required, Validators.maxLength(50)]],
        SubDepartmentID: ["", [Validators.required, Validators.maxLength(50)]],
        DesignationID: ["", [Validators.required, Validators.maxLength(50)]],
        CompanyID: ["", [Validators.required, Validators.maxLength(50)]],
        Code: ["", [Validators.required, Validators.maxLength(50)]],
        LocationID: ["", [Validators.required, Validators.maxLength(50)]],
        JoiningDate: ["", [Validators.required, Validators.maxLength(50)]],
        ReportingManager: ["", [Validators.required, Validators.maxLength(50)]],
        IncentiveType: ["", [Validators.maxLength(50)]],
        WorkShift: ["", [Validators.maxLength(50)]]
      }),
      bank: this.fb.group({
        BankName: ["", [Validators.maxLength(50), Validators.pattern(/^[A-Za-z ]+$/)]],
        BankBranch: ["", [Validators.maxLength(50), Validators.pattern(/^[A-Za-z ]+$/)]],
        AccountNo: ["", [Validators.pattern("^[0-9]{9,18}$")]],
        IFSCNo: ["", [Validators.pattern("^[A-Z]{4}0[A-Z0-9]{6}$")]],
        PFNo: ["", [Validators.pattern("^[A-Z]{2}[\\s\\/]?[A-Z]{3}[\\s\\/]?[0-9]{7}[\\s\\/]?[0-9]{3}[\\s\\/]?[0-9]{7}$")]],
        ESINo: ["", [Validators.pattern("^([0-9]{2})[\–\-]([0-9]{2})[\–\-]([0-9]{6})[\–\-]([0-9]{3})[\–\-]([0-9]{4})$")]],
        UANNo: ["", [Validators.pattern(/^\d{12}$/)]],
        NomineeName: ["", [Validators.maxLength(50), Validators.pattern(/^[A-Za-z ]+$/)]],
        NomineeRelation: ["", [Validators.maxLength(50), Validators.pattern(/^[A-Za-z ]+$/)]],
      }),
      education: this.fb.array([this.createEducation()]),
      experience: this.fb.array([this.createItem()]),

    });
  }

//get company list
getCompaniesList(){
  this.employeeservice.getCompanyList().subscribe((res)=>{
      this.allCompanies=res;
  })
}

//get department List
getDepartments(){
  this.employeeservice.getDepartments().subscribe((res)=>{
    this.allDepartments=res;
  })
}

//get sub Departments
getSubDepartments(){
  this.employeeservice.getSubDepartments().subscribe((res)=>{
    this.allSubDepartments=res;
  })
}

//get location
getLocation(){
  this.employeeservice.getLocation().subscribe((res)=>{
    this.allLocation=res;
  })
}

//get designation
getDesignation(){
  this.employeeservice.getDesignation().subscribe((res)=>{
    this.allDesignation=res;
  })
}
getQualification(){
  this.employeeservice.getQualifications().subscribe((res)=>{
    this.allQualification=res;
  })
}

getDegree(){
  this.employeeservice.getAllDegree().subscribe((res)=>{
    this.allDegree=res;
  })
}
  //form controls
  get f() {
    // console.log("sub dep",this.employeeForm.controls.company.controls.SubDepartmentID.errors.required)
    return this.employeeForm.controls;
  }

  //Empty values for personal
  checkEmptyFirstName() {
    if (this.employeeForm.value.personal.FirstName && this.employeeForm.value.personal.FirstName.trim().length == 0) {
      return true
    }
    else {
      return false
    }
  }

  checkEmptyLastName() {
    if (this.employeeForm.value.personal.LastName && this.employeeForm.value.personal.LastName.trim().length == 0) {
      return true
    }
    else {
      return false
    }
  }
  checkEmptyPersonalEmail() {
    if (this.employeeForm.value.personal.PersonalEmail && this.employeeForm.value.personal.PersonalEmail.trim().length == 0) {
      return true
    }
    else {
      return false
    }
  }
  checkEmptyOfficialEmail() {
    if (this.employeeForm.value.personal.OfficialEmail && this.employeeForm.value.personal.OfficialEmail.trim().length == 0) {
      return true
    }
    else {
      return false
    }
  }
  checkEmptyContactNumber() {
    if (this.employeeForm.value.personal.ContactNo && this.employeeForm.value.personal.ContactNo.trim().length == 0) {
      return true
    }
    else {
      return false
    }
  }

  checkEmptyEmergencyContactPerson() {
    if (this.employeeForm.value.personal.EmergencyContactPerson && this.employeeForm.value.personal.EmergencyContactPerson.trim().length == 0) {
      return true
    }
    else {
      return false
    }
  }
  checkEmptyEmergencyContactRelation() {
    if (this.employeeForm.value.personal.EmergencyContactRelation && this.employeeForm.value.personal.EmergencyContactRelation.trim().length == 0) {
      return true
    }
    else {
      return false
    }
  }
  checkEmptyEmergencyContactNumber() {
    if (this.employeeForm.value.personal.EmergencyContactNo && this.employeeForm.value.personal.EmergencyContactNo.trim().length == 0) {
      return true
    }
    else {
      return false
    }
  }
  checkEmptyAddress() {
    if (this.employeeForm.value.personal.Address && this.employeeForm.value.personal.Address.trim().length == 0) {
      return true
    }
    else {
      return false
    }
  }
  checkEmptyAadharNumber() {
    if (this.employeeForm.value.personal.AadharNo && this.employeeForm.value.personal.AadharNo.trim().length == 0) {
      return true
    }
    else {
      return false
    }
  }
  checkEmptyPanNumber() {
    if (this.employeeForm.value.personal.PanNo && this.employeeForm.value.personal.PanNo.trim().length == 0) {
      return true
    }
    else {
      return false
    }
  }

  createItem() {
    return this.fb.group({
      type: [""],
      companyName: ["",[Validators.maxLength(50)]],
      designationID: ["",[Validators.maxLength(50), Validators.pattern(/^[A-Za-z ]+$/)]],
      yearsOfExperience: ["", [Validators.maxLength(50), Validators.pattern("^(?!0*(\.0+)?$)[0-9]{0,9}(\.[0-9]{1,4})?$")]],
      fromDate: ["", []],
      toDate: ["", []],
      location: ["", [Validators.maxLength(100), Validators.pattern(/^[A-Za-z ]+$/)]],
      referenceName: ["",[Validators.maxLength(50), Validators.pattern(/^[A-Za-z ]+$/)]],
      referenceContactNo: ["", [Validators.maxLength(50), Validators.pattern(/^(?!0+$|1+$)\d{10}$/)]],
      experienceCertificate: ["", [Validators.maxLength(50)]],
    });
  }

  //Add one or more experience details
  addExperience() {
    this.experience = this.employeeForm.get("experience") as FormArray;
    this.experience.push(this.createItem());
    const edu = this.employeeForm.get('education') as FormGroup;
  }

  //delete unwanted experience
  removeExperience(i: any) {
    if (i > 0) {
      this.experience.removeAt(i);
    }
  }

  createEducation() {

    return this.fb.group({
      DegreeID: ["", [ Validators.maxLength(50)]],
      QualificationID: ["", [ Validators.maxLength(50)]],
      Percentage: ["", [ Validators.maxLength(50), Validators.pattern("^(?!0*(\.0+)?$)[0-9]{0,9}(\.[0-9]{1,4})?$")]],
      InstitutionName: ["", [ Validators.maxLength(50), Validators.pattern(/^[A-Za-z ]+$/)]],
      UniversityName: ["", [ Validators.maxLength(100), Validators.pattern(/^[A-Za-z ]+$/)]],
      PassedOutYear: ["", []],
      Certificate: [""]

    });
  }
  //Add one or more education details
  addEducation() {
    this.education = this.employeeForm.get("education") as FormArray;
    this.education.push(this.createEducation());
    const edu = this.employeeForm.get('education') as FormGroup;
  }
  //delete unwanted education details
  removeEducation(i: any) {
    if (i > 0) {
      this.education.removeAt(i);
    }
  }

  //Empty values for Company
  checkEmptyReportingManager() {
    if (this.employeeForm.value.company.ReportingManager && this.employeeForm.value.company.ReportingManager.trim().length == 0) {
      return true
    }
    else {
      return false
    }
  }

  checkEmptyEmpCode() {

    if (this.employeeForm.value.company.Code && this.employeeForm.value.company.Code.trim().length == 0) {
      return true
    }
    else {
      return false
    }
  }

  //Empty values for Bank
  checkEmptyBankName() {
    if (this.employeeForm.value.bank.BankName && this.employeeForm.value.bank.BankName.trim().length == 0) {
      return true
    }
    else {
      return false
    }
  }

  checkEmptyBranch() {

    if (this.employeeForm.value.bank.BankBranch && this.employeeForm.value.bank.BankBranch.trim().length == 0) {
      return true
    }
    else {
      return false
    }
  }
  checkEmptyNomineeName() {
    if (this.employeeForm.value.bank.NomineeName && this.employeeForm.value.bank.NomineeName.trim().length == 0) {
      return true
    }
    else {
      return false
    }
  }

  checkEmptyNomineeRelation() {

    if (this.employeeForm.value.bank.NomineeRelation && this.employeeForm.value.bank.NomineeRelation.trim().length == 0) {
      return true
    }
    else {
      return false
    }
  }

  //empty values for education details
  checkEmptyInstituitionName(i: any) {
    if (this.employeeForm.value.education[i].InstitutionName && this.employeeForm.value.education[i].InstitutionName.trim().length == 0) {
      return true
    }
    else {
      return false
    }
  }

  checkEmptyUniversityName(i: any) {

    if (this.employeeForm.value.education[i].UniversityName && this.employeeForm.value.education[i].UniversityName.trim().length == 0) {
      return true
    }
    else {
      return false
    }
  }

  //empty values for experience details
  checkEmptyPrevCompanyName(i: any) {

    if (this.employeeForm.value.experience[i].companyName && this.employeeForm.value.experience[i].companyName.trim().length == 0) {
      return true
    }
    else {
      return false
    }
  }

  checkEmptyLocation(i: any) {

    if (this.employeeForm.value.experience[i].location && this.employeeForm.value.experience[i].location.trim().length == 0) {
      return true
    }
    else {
      return false
    }
  }

  checkEmptyDesignation(i: any) {

    if (this.employeeForm.value.experience[i].designationID && this.employeeForm.value.experience[i].designationID.trim().length == 0) {
      return true
    }
    else {
      return false
    }
  }

  checkEmptyReferenceName(i: any) {

    if (this.employeeForm.value.experience[i].referenceName && this.employeeForm.value.experience[i].referenceName.trim().length == 0) {
      return true
    }
    else {
      return false
    }
  }

  onSubmit() {
    this.submitted = true;


    //trim all values
    //personal values
    if (this.employeeForm.value.personal.FirstName) {
      this.employeeForm.value.personal.FirstName = this.employeeForm.value.personal.FirstName.trim();
    }
    if (this.employeeForm.value.personal.LastName) {
      this.employeeForm.value.personal.Code = this.employeeForm.value.personal.LastName.trim();
    }
    if (this.employeeForm.value.personal.OfficialEmail) {
      this.employeeForm.value.personal.OfficialEmail = this.employeeForm.value.personal.OfficialEmail.trim();
    }
    if (this.employeeForm.value.personal.PersonalEmail) {
      this.employeeForm.value.personal.PersonalEmail = this.employeeForm.value.personal.PersonalEmail.trim();
    }
    if (this.employeeForm.value.personal.Address) {
      this.employeeForm.value.personal.Address = this.employeeForm.value.personal.Address.trim();
    }
    if (this.employeeForm.value.personal.EmergencyContactPerson) {
      this.employeeForm.value.personal.EmergencyContactPerson = this.employeeForm.value.personal.EmergencyContactPerson.trim();
    }
    if (this.employeeForm.value.personal.EmergencyContactRelation) {
      this.employeeForm.value.personal.EmergencyContactRelation = this.employeeForm.value.personal.EmergencyContactRelation.trim();
    }
    if (this.employeeForm.value.personal.EmergencyContactNo) {
      this.employeeForm.value.personal.EmergencyContactNo = this.employeeForm.value.personal.EmergencyContactNo.trim();
    }
    if (this.employeeForm.value.personal.AadharNo) {
      this.employeeForm.value.personal.AadharNo = this.employeeForm.value.personal.AadharNo.trim();
    }
    if (this.employeeForm.value.personal.PanNo) {
      this.employeeForm.value.personal.PanNo = this.employeeForm.value.personal.PanNo.trim();
    }
    if (this.employeeForm.value.personal.ContactNo) {
      this.employeeForm.value.personal.ContactNo = this.employeeForm.value.personal.ContactNo.trim();
    }

    //company values
    if (this.employeeForm.value.company.Code) {
      this.employeeForm.value.company.Code = this.employeeForm.value.company.Code.trim();
    }

    //bank values
    if (this.employeeForm.value.bank.BankName) {
      this.employeeForm.value.bank.BankName = this.employeeForm.value.bank.BankName.trim();
    }
    if (this.employeeForm.value.bank.BankBranch) {
      this.employeeForm.value.bank.BankBranch = this.employeeForm.value.bank.BankBranch.trim();
    }
    if (this.employeeForm.value.bank.AccountNo) {
      this.employeeForm.value.bank.AccountNo = this.employeeForm.value.bank.AccountNo.trim();
    }
    if (this.employeeForm.value.bank.IFSCNo) {
      this.employeeForm.value.bank.IFSCNo = this.employeeForm.value.bank.IFSCNo.trim();
    }
    if (this.employeeForm.value.bank.PFNo) {
      this.employeeForm.value.bank.PFNo = this.employeeForm.value.bank.PFNo.trim();
    }
    if (this.employeeForm.value.bank.ESINo) {
      this.employeeForm.value.bank.ESINo = this.employeeForm.value.bank.ESINo.trim();
    }
    if (this.employeeForm.value.bank.UANNo) {
      this.employeeForm.value.bank.UANNo = this.employeeForm.value.bank.UANNo.trim();
    }
    if (this.employeeForm.value.bank.NomineeName) {
      this.employeeForm.value.bank.NomineeName = this.employeeForm.value.bank.NomineeName.trim();
    }
    if (this.employeeForm.value.bank.NomineeRelation) {
      this.employeeForm.value.bank.NomineeRelation = this.employeeForm.value.bank.NomineeRelation.trim();
    }

//trim experience values
// for(let i=0;i<= this.employeeForm.value.experience.length;i++){

//  console.log("designation id",this.employeeForm.value.experience[i].designationID)
//   if (this.employeeForm.value.experience[i].designationID) {
//     this.employeeForm.value.experience[i].designationID = this.employeeForm.value.experience[i].designationID.trim();
//   }
//   if (this.employeeForm.value.experience[i].companyName) {
//     this.employeeForm.value.experience[i].companyName = this.employeeForm.value.experience[i].companyName.trim();
//   }
//   if (this.employeeForm.value.experience[i].referenceName) {
//     this.employeeForm.value.experience[i].referenceName = this.employeeForm.value.experience[i].referenceName.trim();
//   }
//   if (this.employeeForm.value.experience[i].referenceContactNo) {
//     this.employeeForm.value.experience[i].referenceContactNo = this.employeeForm.value.experience[i].referenceContactNo.trim();
//   }
//   if (this.employeeForm.value.experience[i].location) {
//     this.employeeForm.value.experience[i].location = this.employeeForm.value.experience[i].location.trim();
//   }
//   else{
//     return
//   }
// }

    //loop to get format in educational Details
    for (let i = 0; i < this.employeeForm.value.education.length; i++) {

      //trim educational values
      if (this.employeeForm.value.education[i].InstitutionName) {
        this.employeeForm.value.education[i].InstitutionName = this.employeeForm.value.education[i].InstitutionName.trim();
      }
      if (this.employeeForm.value.education[i].UniversityName) {
        this.employeeForm.value.education[i].UniversityName = this.employeeForm.value.education[i].UniversityName.trim();
      }

      var eduval = {
        degree: {
          id: this.employeeForm.value.education[i].DegreeID,
          qualifications: {
            id: this.employeeForm.value.education[i].QualificationID
          }
        },
        percentage: this.employeeForm.value.education[i].Percentage,
        institutionName: this.employeeForm.value.education[i].InstitutionName,
        universityName: this.employeeForm.value.education[i].UniversityName,
        passedOutYear: this.employeeForm.value.education[i].PassedOutYear,
        certificate: this.employeeForm.value.education[i].Certificate
      }
      this.educationValue.push(eduval)
    }

    //align referal value
    this.referral = {
      referredBy: {
        code: this.employeeForm.value.reference.Code
      },
      referralDuration: this.employeeForm.value.reference.ReferralDuration,
    },

    //Total value
    this.totalForm = {

      code: this.employeeForm.value.company.Code,
      firstName: this.employeeForm.value.personal.FirstName,
      lastName: this.employeeForm.value.personal.LastName,
      bloodGroup: this.employeeForm.value.personal.BloodGroup,
      gender: this.employeeForm.value.personal.Gender,
      officialDOB: this.employeeForm.value.personal.OfficialDOB,
      actualDOB: this.employeeForm.value.personal.ActualDOB,
      personalEmail: this.employeeForm.value.personal.PersonalEmail,
      officialEmail: this.employeeForm.value.personal.OfficialEmail,
      contactNo: this.employeeForm.value.personal.ContactNo,
      maritalStatus: this.employeeForm.value.personal.MaritalStatus,
      address: this.employeeForm.value.personal.Address,
      emergencyContactPerson: this.employeeForm.value.personal.EmergencyContactPerson,
      emergencyContactRelation: this.employeeForm.value.personal.EmergencyContactRelation,
      emergencyContactNo: this.employeeForm.value.personal.EmergencyContactNo,
      aadharNo: this.employeeForm.value.personal.AadharNo,
      bankName: this.employeeForm.value.bank.BankName,
      bankBranch: this.employeeForm.value.bank.BankBranch,
      accountNo: this.employeeForm.value.bank.AccountNo,
      ifscNo: this.employeeForm.value.bank.IFSCNo,
      panNo: this.employeeForm.value.personal.PanNo,
      pfNo: this.employeeForm.value.bank.PFNo,
      esiNo: this.employeeForm.value.bank.ESINo,
      uanNo: this.employeeForm.value.bank.UANNo,
      nomineeName: this.employeeForm.value.bank.NomineeName,
      nomineeRelation: this.employeeForm.value.bank.NomineeRelation,
      department: {
        id: this.employeeForm.value.company.DepartmentID,
      },
      subDepartment: {
        id: this.employeeForm.value.company.SubDepartmentID,
      },
      designation: {
        id: this.employeeForm.value.company.DesignationID,
      },
      company: {
        id: this.employeeForm.value.company.CompanyID,
      },
      location: {
        id: this.employeeForm.value.company.LocationID,
      },
      joiningDate: this.employeeForm.value.company.JoiningDate,
      reportingManager: this.employeeForm.value.company.ReportingManager,
      incentiveType: this.employeeForm.value.company.IncentiveType,
      workShift: this.employeeForm.value.company.WorkShift,
      educations: this.educationValue,
      experiences: this.employeeForm.value.experience,
      referral: this.referral
    }
    this.totalForm=JSON.stringify(this.totalForm)
    // stop here if form is invalid
    if (this.employeeForm.invalid) {
      return;
    }

    this.educationValue=[]
    this.employeeservice.createEmployee(this.totalForm).subscribe((res) => {
      console.log("response", res);
    })
  }
}
