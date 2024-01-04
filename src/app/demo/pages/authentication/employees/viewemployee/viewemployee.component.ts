import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { TogglebuttonComponent } from '../../../materials/togglebutton/togglebutton.component';
@Component({
  selector: 'app-viewemployee',
 
  templateUrl: './viewemployee.component.html',
  styleUrls: ['./viewemployee.component.scss'],

})
export default class ViewemployeeComponent {

  tableView:any;
  url="../../../../../../assets/images/user/";
  employeeData:any[]=[
    {
      "code": "EMP/TVM/100",
      "firstName": "Vincy",
      "lastName": "Sahayaraj",
      "bloodGroup": "O+ve",
      "gender": "Female",
      "officialDOB": "2000-08-02T00:00:00",
      "actualDOB": "2000-08-02T00:00:00",
      "personalEmail": "vincysahayaraj@gmail.com",
      "officialEmail": "vincysahayaraj@ecesistech.com",
      "contactNo": "9876545678",
      "maritalStatus": "Single",
      "address": "Nagercoil",
      "emergencyContactPerson": "Georgeammal",
      "emergencyContactRelation": "Mother",
      "emergencyContactNo": "6776787888",
      "profilepath":"vincy.jpg",
      "aadharNo": "",
      "bankName": "",
      "bankBranch": "",
      "accountNo": "",
      "ifscNo": "",
      "panNo": "",
      "pfNo": "",
      "esiNo": "",
      "uanNo": "",
      "nomineeName": "",
      "nomineeRelation": "",
      "department": {
        "id": 1,
        "name": "BPO",
        "isActive": 0
      },
      "subDepartment": {
        "id": 1,
        "name": "Production",
        "departmentID": null,
        "isActive": 0,
        "department": null
      },
      "designation": {
        "id": 1,
        "departmentID": null,
        "subDepartmentID": null,
        "name": "Researcher",
        "isActive": 0,
        "department": null,
        "subDepartment": null
      },
      "company": {
        "id": 1,
        "name": "ECESISBPO",
        "address": null,
        "cin": null,
        "gstin": null,
        "contactNo": null,
        "isActive": null
      },
      "location": {
        "id": 1,
        "name": "Thiruvananthapuram",
        "isActive": null
      },
      "joiningDate": "2023-08-02T00:00:00",
      "reportingManager": "Arun",
      "incentiveType": null,
      "workShift": "",
      "relievingDate": null,
      "empStatus": "In Progress",
      "isActive": 0,
      "educations": [
        {
          "id": 24,
          "degree": {
            "id": 1,
            "qualifications": {
              "id": 1,
              "name": "BTech",
              "isActive": null
            },
            "name": "CS",
            "isActive": null
          },
          "percentage": null,
          "institutionName": "KSR",
          "universityName": "Anna University",
          "passedOutYear": 2021,
          "certificate": "not available",
          "isActive": 0
        },
        {
          "id": 25,
          "degree": {
            "id": 1,
            "qualifications": {
              "id": 1,
              "name": "BTech",
              "isActive": null
            },
            "name": "CS",
            "isActive": null
          },
          "percentage": null,
          "institutionName": "Jipmer",
          "universityName": "Jipmer University",
          "passedOutYear": 2022,
          "certificate": "not available",
          "isActive": 0
        }
      ],
      "experiences": [
        {
          "id": 25,
          "type": "Internship",
          "companyName": "DCube",
          "designation": "Intern",
          "yearsOfExperience": 1,
          "fromDate": "2022-06-02T00:00:00",
          "toDate": "2022-11-02T00:00:00",
          "location": "Trivandrum",
          "referenceName": "Afzal",
          "referenceContactNo": "8998989898",
          "experienceCertificate": ""
        },
        {
          "id": 26,
          "type": "Full time",
          "companyName": "Ecesis",
          "designation": "Junior software developer",
          "yearsOfExperience": 1,
          "fromDate": "2023-01-02T00:00:00",
          "toDate": "2023-06-02T00:00:00",
          "location": "Trivandrum",
          "referenceName": "",
          "referenceContactNo": "",
          "experienceCertificate": ""
        }
      ],
      "referral": {
        "id": 4,
        "referredBy": {
          "code": "EMP/TVM/100",
          "firstName": "Thomas",
          "lastName": "Mathew",
          "bloodGroup": null,
          "gender": null,
          "officialDOB": null,
          "actualDOB": null,
          "personalEmail": null,
          "officialEmail": null,
          "contactNo": null,
          "maritalStatus": null,
          "address": null,
          "emergencyContactPerson": null,
          "emergencyContactRelation": null,
          "emergencyContactNo": null,
          "aadharNo": null,
          "bankName": null,
          "bankBranch": null,
          "accountNo": null,
          "ifscNo": null,
          "panNo": null,
          "pfNo": null,
          "esiNo": null,
          "uanNo": null,
          "nomineeName": null,
          "nomineeRelation": null,
          "department": null,
          "subDepartment": null,
          "designation": null,
          "company": null,
          "location": null,
          "joiningDate": null,
          "reportingManager": null,
          "incentiveType": null,
          "workShift": null,
          "relievingDate": null,
          "empStatus": null,
          "isActive": null,
          "educations": null,
          "experiences": null,
          "referral": null,
          "documents": null
        },
        "referralDuration": "2023-08-02T00:00:00",
        "referralPaid": false
      },
      "documents": null
    },
  {
      "code": "EMP/TVM/101",
      "firstName": "George",
      "lastName": "Sahayaraj",
      "bloodGroup": "O+ve",
      "gender": "Female",
      "officialDOB": "2000-08-02T00:00:00",
      "actualDOB": "2000-08-02T00:00:00",
      "personalEmail": "vincysahayaraj@gmail.com",
      "officialEmail": "vincysahayaraj@ecesistech.com",
      "contactNo": "9876545678",
      "maritalStatus": "Single",
      "address": "Nagercoil",
      "emergencyContactPerson": "Georgeammal",
      "emergencyContactRelation": "Mother",
      "emergencyContactNo": "6776787888",
      "aadharNo": "",
      "profilepath":"avatar-1.jpg",
      "bankName": "",
      "bankBranch": "",
      "accountNo": "",
      "ifscNo": "",
      "panNo": "",
      "pfNo": "",
      "esiNo": "",
      "uanNo": "",
      "nomineeName": "",
      "nomineeRelation": "",
      "department": {
        "id": 1,
        "name": "BPO",
        "isActive": 0
      },
      "subDepartment": {
        "id": 1,
        "name": "Production",
        "departmentID": null,
        "isActive": 0,
        "department": null
      },
      "designation": {
        "id": 1,
        "departmentID": null,
        "subDepartmentID": null,
        "name": "Researcher",
        "isActive": 0,
        "department": null,
        "subDepartment": null
      },
      "company": {
        "id": 1,
        "name": "ECESISBPO",
        "address": null,
        "cin": null,
        "gstin": null,
        "contactNo": null,
        "isActive": null
      },
      "location": {
        "id": 1,
        "name": "Thiruvananthapuram",
        "isActive": null
      },
      "joiningDate": "2023-08-02T00:00:00",
      "reportingManager": "Arun",
      "incentiveType": null,
      "workShift": "",
      "relievingDate": null,
      "empStatus": "In Progress",
      "isActive": 0,
      "educations": [
        {
          "id": 24,
          "degree": {
            "id": 1,
            "qualifications": {
              "id": 1,
              "name": "BTech",
              "isActive": null
            },
            "name": "CS",
            "isActive": null
          },
          "percentage": null,
          "institutionName": "KSR",
          "universityName": "Anna University",
          "passedOutYear": 2021,
          "certificate": "not available",
          "isActive": 0
        },
        {
          "id": 25,
          "degree": {
            "id": 1,
            "qualifications": {
              "id": 1,
              "name": "BTech",
              "isActive": null
            },
            "name": "CS",
            "isActive": null
          },
          "percentage": null,
          "institutionName": "Jipmer",
          "universityName": "Jipmer University",
          "passedOutYear": 2022,
          "certificate": "not available",
          "isActive": 0
        }
      ],
      "experiences": [
        {
          "id": 25,
          "type": "Internship",
          "companyName": "DCube",
          "designation": "Intern",
          "yearsOfExperience": 1,
          "fromDate": "2022-06-02T00:00:00",
          "toDate": "2022-11-02T00:00:00",
          "location": "Trivandrum",
          "referenceName": "Afzal",
          "referenceContactNo": "8998989898",
          "experienceCertificate": ""
        },
        {
          "id": 26,
          "type": "Full time",
          "companyName": "Ecesis",
          "designation": "Junior software developer",
          "yearsOfExperience": 1,
          "fromDate": "2023-01-02T00:00:00",
          "toDate": "2023-06-02T00:00:00",
          "location": "Trivandrum",
          "referenceName": "",
          "referenceContactNo": "",
          "experienceCertificate": ""
        }
      ],
      "referral": {
        "id": 4,
        "referredBy": {
          "code": "EMP/TVM/100",
          "firstName": "Thomas",
          "lastName": "Mathew",
          "bloodGroup": null,
          "gender": null,
          "officialDOB": null,
          "actualDOB": null,
          "personalEmail": null,
          "officialEmail": null,
          "contactNo": null,
          "maritalStatus": null,
          "address": null,
          "emergencyContactPerson": null,
          "emergencyContactRelation": null,
          "emergencyContactNo": null,
          "aadharNo": null,
          "bankName": null,
          "bankBranch": null,
          "accountNo": null,
          "ifscNo": null,
          "panNo": null,
          "pfNo": null,
          "esiNo": null,
          "uanNo": null,
          "nomineeName": null,
          "nomineeRelation": null,
          "department": null,
          "subDepartment": null,
          "designation": null,
          "company": null,
          "location": null,
          "joiningDate": null,
          "reportingManager": null,
          "incentiveType": null,
          "workShift": null,
          "relievingDate": null,
          "empStatus": null,
          "isActive": null,
          "educations": null,
          "experiences": null,
          "referral": null,
          "documents": null
        },
        "referralDuration": "2023-08-02T00:00:00",
        "referralPaid": false
      },
      "documents": null
    },
  {
      "code": "EMP/TVM/102",
      "firstName": "Laswin",
      "lastName": "Sahayaraj",
      "bloodGroup": "O+ve",
      "gender": "Female",
      "officialDOB": "2000-08-02T00:00:00",
      "actualDOB": "2000-08-02T00:00:00",
      "personalEmail": "vincysahayaraj@gmail.com",
      "officialEmail": "vincysahayaraj@ecesistech.com",
      "contactNo": "9876545678",
      "maritalStatus": "Single",
      "address": "Nagercoil",
      "emergencyContactPerson": "Georgeammal",
      "emergencyContactRelation": "Mother",
      "emergencyContactNo": "6776787888",
      "aadharNo": "",
      "profilepath":"avatar-3.jpg",
      "bankName": "",
      "bankBranch": "",
      "accountNo": "",
      "ifscNo": "",
      "panNo": "",
      "pfNo": "",
      "esiNo": "",
      "uanNo": "",
      "nomineeName": "",
      "nomineeRelation": "",
      "department": {
        "id": 1,
        "name": "BPO",
        "isActive": 0
      },
      "subDepartment": {
        "id": 1,
        "name": "Production",
        "departmentID": null,
        "isActive": 0,
        "department": null
      },
      "designation": {
        "id": 1,
        "departmentID": null,
        "subDepartmentID": null,
        "name": "Researcher",
        "isActive": 0,
        "department": null,
        "subDepartment": null
      },
      "company": {
        "id": 1,
        "name": "ECESISBPO",
        "address": null,
        "cin": null,
        "gstin": null,
        "contactNo": null,
        "isActive": null
      },
      "location": {
        "id": 1,
        "name": "Thiruvananthapuram",
        "isActive": null
      },
      "joiningDate": "2023-08-02T00:00:00",
      "reportingManager": "Arun",
      "incentiveType": null,
      "workShift": "",
      "relievingDate": null,
      "empStatus": "In Progress",
      "isActive": 0,
      "educations": [
        {
          "id": 24,
          "degree": {
            "id": 1,
            "qualifications": {
              "id": 1,
              "name": "BTech",
              "isActive": null
            },
            "name": "CS",
            "isActive": null
          },
          "percentage": null,
          "institutionName": "KSR",
          "universityName": "Anna University",
          "passedOutYear": 2021,
          "certificate": "not available",
          "isActive": 0
        },
        {
          "id": 25,
          "degree": {
            "id": 1,
            "qualifications": {
              "id": 1,
              "name": "BTech",
              "isActive": null
            },
            "name": "CS",
            "isActive": null
          },
          "percentage": null,
          "institutionName": "Jipmer",
          "universityName": "Jipmer University",
          "passedOutYear": 2022,
          "certificate": "not available",
          "isActive": 0
        }
      ],
      "experiences": [
        {
          "id": 25,
          "type": "Internship",
          "companyName": "DCube",
          "designation": "Intern",
          "yearsOfExperience": 1,
          "fromDate": "2022-06-02T00:00:00",
          "toDate": "2022-11-02T00:00:00",
          "location": "Trivandrum",
          "referenceName": "Afzal",
          "referenceContactNo": "8998989898",
          "experienceCertificate": ""
        },
        {
          "id": 26,
          "type": "Full time",
          "companyName": "Ecesis",
          "designation": "Junior software developer",
          "yearsOfExperience": 1,
          "fromDate": "2023-01-02T00:00:00",
          "toDate": "2023-06-02T00:00:00",
          "location": "Trivandrum",
          "referenceName": "",
          "referenceContactNo": "",
          "experienceCertificate": ""
        }
      ],
      "referral": {
        "id": 4,
        "referredBy": {
          "code": "EMP/TVM/100",
          "firstName": "Thomas",
          "lastName": "Mathew",
          "bloodGroup": null,
          "gender": null,
          "officialDOB": null,
          "actualDOB": null,
          "personalEmail": null,
          "officialEmail": null,
          "contactNo": null,
          "maritalStatus": null,
          "address": null,
          "emergencyContactPerson": null,
          "emergencyContactRelation": null,
          "emergencyContactNo": null,
          "aadharNo": null,
          "bankName": null,
          "bankBranch": null,
          "accountNo": null,
          "ifscNo": null,
          "panNo": null,
          "pfNo": null,
          "esiNo": null,
          "uanNo": null,
          "nomineeName": null,
          "nomineeRelation": null,
          "department": null,
          "subDepartment": null,
          "designation": null,
          "company": null,
          "location": null,
          "joiningDate": null,
          "reportingManager": null,
          "incentiveType": null,
          "workShift": null,
          "relievingDate": null,
          "empStatus": null,
          "isActive": null,
          "educations": null,
          "experiences": null,
          "referral": null,
          "documents": null
        },
        "referralDuration": "2023-08-02T00:00:00",
        "referralPaid": false
      },
      "documents": null
    }
  ];

  
  //for toggle ON OFF
  GetChildData(data:any){  
 
    this.tableView=data; 
    return data; 
 } 

 ngOnInit(){

  this.getEmployeeData();
  
 }

  constructor(private router: Router) {}

  getEmployeeData(){
    console.log("Employee Data",this.employeeData)
  } 
}
