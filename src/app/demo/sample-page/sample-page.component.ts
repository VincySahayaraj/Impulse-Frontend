import { Component } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";

// const ABOUT_FORM = {
//         firstName: ["",Validators.required],
//         lastName: [""],
//         jobTitle: [""],
//         websiteUrl: [""]
//       };

@Component({
  selector: 'app-sample-page',
  templateUrl: './sample-page.component.html',
  styleUrls: ['./sample-page.component.scss']
})
export default class SamplePageComponent {

  name = "Angular";
  myForm: any;
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
  constructor(public fb: FormBuilder) { }

  ngOnInit() {
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

    this.myForm = this.fb.group({

      personal: this.fb.group({
        Code: ["", Validators.required],
        FirstName: ["", Validators.required],
        LastName: ["", Validators.required],
        BloodGroup: ["", Validators.required],
        Gender: ["", Validators.required],
        OfficialDOB: ["", Validators.required],
        ActualDOB: ["", Validators.required],
        PersonalEmail: ["", Validators.required],
        OfficialEmail: ["", Validators.required],
        ContactNo: ["", Validators.required],
        MaritalStatus: ["", Validators.required],
        Address: ["", Validators.required],
        EmergencyContactPerson: ["", Validators.required],
        EmergencyContactRelation: ["", Validators.required],
        EmergencyContactNo: ["", Validators.required],
        AadharNo: ["", Validators.required],
        BankName: ["", Validators.required],
        BankBranch: ["", Validators.required],
        AccountNo: ["", Validators.required],
        IFSCNo: ["", Validators.required],
        PanNo: ["", Validators.required],
        PFNo: ["", Validators.required],
        ESINo: ["", Validators.required],
        UANNo: ["", Validators.required],
        NomineeName: ["", Validators.required],
        NomineeRelation: ["", Validators.required],
        DepartmentID: ["", Validators.required],
        SubDepartmentID: ["", Validators.required],
        DesignationID: ["", Validators.required],
        CompanyID: ["", Validators.required],
        LocationID: ["", Validators.required],
        JoiningDate: ["", Validators.required],
        ReportingManager: ["", Validators.required],
        IncentiveType: ["", Validators.required],
        WorkShift: ["", Validators.required]

      }),

      reference: this.fb.group({
        Code: ["", Validators.required],
        ReferralDuration: ["", Validators.required],

      }),

      education: this.fb.array([this.createEducation()]),
      experience: this.fb.array([this.createItem()])
    });
  }

  createItem() {
    return this.fb.group({
      type: ["", Validators.required],
      companyName: ["", Validators.required],
      designationID: ["", Validators.required],
      yearsOfExperience: ["", Validators.required],
      fromDate: ["", Validators.required],
      toDate: [""],
      location: [""],
      referenceName: ["", Validators.required],
      referenceContactNo: ["", Validators.required],
      experienceCertificate: ["", Validators.required],
    });
  }

  //Add one or more experience details
  addExperience() {
    this.experience = this.myForm.get("experience") as FormArray;
    this.experience.push(this.createItem());
    const edu = this.myForm.get('education') as FormGroup;
  }

  //delete unwanted experience
  removeExperience(i: any) {
    console.log("i valuee", i)
    if (i > 0) {
      this.experience.removeAt(i);
    }
  }

  createEducation() {

    return this.fb.group({
      DegreeID: ["", Validators.required],
      QualificationID: ["", Validators.required],
      Percentage: ["", Validators.required],
      InstitutionName: ["", Validators.required],
      UniversityName: ["", Validators.required],
      PassedOutYear: ["", Validators.required],
      Certificate: [""]

    });
  }
  //Add one or more education details
  addEducation() {
    this.education = this.myForm.get("education") as FormArray;
    this.education.push(this.createEducation());
    const edu = this.myForm.get('education') as FormGroup;
  }
  //delete unwanted education details
  removeEducation(i: any) {
    if (i > 0) {
      this.education.removeAt(i);
    }

  }

  onSubmit() {
    this.submitted = true;
    
    //loop to get format
    for (let i = 0; i < this.myForm.value.education.length; i++) {

      var eduval = {
        degree: {
          id: this.myForm.value.education[i].DegreeID,
          qualifications: {
            id: this.myForm.value.education[i].QualificationID
          }
        },
        percentage: this.myForm.value.education[i].Percentage,
        institutionName: this.myForm.value.education[i].InstitutionName,
        universityName: this.myForm.value.education[i].UniversityName,
        passedOutYear: this.myForm.value.education[i].PassedOutYear,
        certificate: this.myForm.value.education[i].Certificate
      }
      this.educationValue.push(eduval)
      console.log("education values", this.educationValue)
    }

    //align referal value
    this.referral = {
      referredBy: {
        code: this.myForm.value.reference.Code
      },
      referralDuration: this.myForm.value.reference.ReferralDuration,
    },

      //Total value
      this.totalForm = {

        code: this.myForm.value.personal.Code,
        firstName: this.myForm.value.personal.FirstName,
        lastName: this.myForm.value.personal.LastName,
        bloodGroup: this.myForm.value.personal.BloodGroup,
        gender: this.myForm.value.personal.Gender,
        officialDOB: this.myForm.value.personal.OfficialDOB,
        actualDOB: this.myForm.value.personal.ActualDOB,
        personalEmail: this.myForm.value.personal.PersonalEmail,
        officialEmail: this.myForm.value.personal.OfficialEmail,
        contactNo: this.myForm.value.personal.ContactNo,
        maritalStatus: this.myForm.value.personal.MaritalStatus,
        address: this.myForm.value.personal.Address,
        emergencyContactPerson: this.myForm.value.personal.EmergencyContactPerson,
        emergencyContactRelation: this.myForm.value.personal.EmergencyContactRelation,
        emergencyContactNo: this.myForm.value.personal.EmergencyContactNo,
        aadharNo: this.myForm.value.personal.AadharNo,
        bankName: this.myForm.value.personal.BankName,
        bankBranch: this.myForm.value.personal.BankBranch,
        accountNo: this.myForm.value.personal.AccountNo,
        ifscNo: this.myForm.value.personal.IFSCNo,
        panNo: this.myForm.value.personal.PanNo,
        pfNo: this.myForm.value.personal.PFNo,
        esiNo: this.myForm.value.personal.ESINo,
        uanNo: this.myForm.value.personal.UANNo,
        nomineeName: this.myForm.value.personal.NomineeName,
        nomineeRelation: this.myForm.value.personal.NomineeRelation,
        department: {
          id: this.myForm.value.personal.DepartmentID,
        },
        subDepartment: {
          id: this.myForm.value.personal.SubDepartmentID,
        },
        designation: {
          id: this.myForm.value.personal.DesignationID,
        },
        company: {
          id: this.myForm.value.personal.CompanyID,
        },
        location: {
          id: this.myForm.value.personal.LocationID,
        },
        joiningDate: this.myForm.value.personal.JoiningDate,
        reportingManager: this.myForm.value.personal.ReportingManager,
        incentiveType: this.myForm.value.personal.IncentiveType,
        workShift: this.myForm.value.personal.WorkShift,
        educations: this.educationValue,
        experiences: this.myForm.value.experience,
        reference: this.referral
      }
    console.log("my form", this.totalForm);
  }
}
