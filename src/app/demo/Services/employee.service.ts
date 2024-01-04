import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http: HttpClient) { }

  //add employee
  createEmployee(empDetails: any) {
    return this._http.post(environment.apiUrl + "Employee/CreateEmployee", empDetails, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  //get companies
  getCompanies() {
    return this._http.post(environment.apiUrl + "Company/List", {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  //add department
  addDepartment(departments: any) {
    return this._http.post(environment.apiUrl + "Department/create", departments, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  //get departments
  getDepartments() {
    return this._http.get(environment.apiUrl + "Department/List", {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });

  }
  getDepartmentById(id: any) {
    return this._http.post(environment.apiUrl + "Department/DepartmentDetailsByID?DepartmentID=" + id, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }
  //edit department
  editDepartment(departments: any) {
    return this._http.put(environment.apiUrl + "Department/Update", departments, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }


  //delete department
  deleteDepartment(id: any) {
    return this._http.post(environment.apiUrl + "Department/Delete?DepartmentID=" + id, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  //Active department
  activeDepartment(id: any) {
    return this._http.post(environment.apiUrl + "Department/UnDelete?DepartmentID=" + id, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  //get sub departments
  getSubDepartments() {
    return this._http.get(environment.apiUrl + "SubDepartment/List", {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }
  getSubDepartmentById(id: any) {
    return this._http.post(environment.apiUrl + "SubDepartment/SubDepartmentDetailsByID?SubDepartmentID=" + id, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  getSubDepartmentByDepId(id:any){
    return this._http.post(environment.apiUrl + "SubDepartment/SubDepartmentDetailsByID?SubDepartmentID=" + id, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }
  //add sub department
  addSubDepartment(value: any) {
    return this._http.post(environment.apiUrl + "SubDepartment/create", value, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  //edit subdepartment
  editSubDepartment(value: any) {
    return this._http.put(environment.apiUrl + "SubDepartment/Update", value, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  //delete department
  deleteSubDepartment(id: any) {
    return this._http.post(environment.apiUrl + "SubDepartment/Delete?SubDepartmentID=" + id, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  //Active department
  activateSubDepartment(id: any) {
    return this._http.post(environment.apiUrl + "SubDepartment/UnDelete?SubDepartmentID=" + id, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }




  //add designation
  addDesignation(designation: any) {
    return this._http.post(environment.apiUrl + "Designation/Create", designation, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

    //add designation
    editDesignation(designation: any) {
      return this._http.put(environment.apiUrl + "Designation/Update", designation, {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
      });
    }

  //get Designation
  getDesignation() {
    return this._http.get(environment.apiUrl + "Designation/List", {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  //get designation by Id
  getDesignationById(id: any) {
    return this._http.post(environment.apiUrl + "Designation/DesignationDetailsByID?DesignationID=" + id, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  //delete designation
  deleteDesignation(id: any) {
    return this._http.post(environment.apiUrl + "Designation/Delete?DesignationID=" + id, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

   //activate designation
   activateDesignation(id: any) {
    return this._http.post(environment.apiUrl + "Designation/UnDelete?DesignationID=" + id, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }


  //get all degrees
  getAllDegree() {
    return this._http.get(environment.apiUrl + "Degree/List", {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  //get degree by id
  getDegreeById(id: any) {
    return this._http.post(environment.apiUrl + "Degree/DegreeDetailsByID?DegreeID=" + id, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }


  //add degree
  addDegree(value: any) {
    return this._http.post(environment.apiUrl + "Degree/Create", value, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  //edit degree
  editDegree(value: any) {
    return this._http.put(environment.apiUrl + "Degree/Update", value, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  //delete degree
  deleteDegree(id: any) {
    return this._http.post(environment.apiUrl + "Degree/Delete?DegreeID=" + id, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  activeDegree(id: any) {
    return this._http.post(environment.apiUrl + "Degree/UnDelete?DegreeID=" + id, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  //get all Qualification
  getQualifications() {
    return this._http.get(environment.apiUrl + "Qualification/List", {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  //get qualification by Id
  getQualificationById(id: any) {
    return this._http.post(environment.apiUrl + "Qualification/QualificationDetailsByID?QualificationID=" + id, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  //add Qualification
  addQualification(value: any) {
    return this._http.post(environment.apiUrl + "Qualification/Create", value, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  //edit Qualification
  editQualification(value: any) {
    return this._http.put(environment.apiUrl + "Qualification/Update", value, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  //delete Qualification
  deleteQualification(id: any) {
    return this._http.post(environment.apiUrl + "Qualification/Delete?QualificationID=" + id, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }
  //activate Qualification
  activateQualification(id: any) {
    return this._http.post(environment.apiUrl + "Qualification/UnDelete?QualificationID=" + id, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  //add location
  addLocation(location: any) {
    return this._http.post(environment.apiUrl + "Location/create", location, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  //edit Qualification
  editLocation(value: any) {
    return this._http.put(environment.apiUrl + "Location/Update", value, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }


  //get Location
  getLocation() {
    return this._http.get(environment.apiUrl + "Location/List", {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  //get location by id
  getLocationById(id: any) {
    return this._http.post(environment.apiUrl + "Location/LocationDetailsByID?LocationID=" + id, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }
  //delete Location
  deleteLocation(id: any) {
    return this._http.post(environment.apiUrl + "Location/Delete?LocationID=" + id, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }
  //undelete a Location
  activateLocation(id: any) {
    return this._http.post(environment.apiUrl + "Location/UnDelete?LocationID=" + id, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  //get all companies
  getCompanyList() {
    return this._http.get(environment.apiUrl + "Company/List", {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  //get qualification by Id
  getCompanyById(id: any) {

    return this._http.post(environment.apiUrl + "Company/CompanyDetailsByID?CompanyID=" + id, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  //add degree
  addCompany(value: any) {
    return this._http.post(environment.apiUrl + "Company/Create", value, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  //edit company
  editCompany(value: any) {
    return this._http.put(environment.apiUrl + "Company/Update", value, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  //delete company
  deleteCompany(id: any) {
    return this._http.post(environment.apiUrl + "Company/Delete?CompanyID=" + id, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }
  //undelete a company
  activateCompany(id: any) {
    return this._http.post(environment.apiUrl + "Company/UnDelete?CompanyID=" + id, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }


  //get salary
  getSalary() {
    return this._http.get(environment.apiUrl + "Employee/ListEmployeeSalaryDetails", {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }
}
