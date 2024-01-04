
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient) { }

  checkExistingUser(empCode:any){
    return this._http.post(environment.apiUrl + "Login/CheckUser",empCode, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  checkNewUser(Password:any){
    return this._http.post(environment.apiUrl + "Login/CreateNewPassword",Password, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  loginforExistUser(empDetails:any){
    return this._http.post(environment.apiUrl + "Login/LoginUser",empDetails, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }
}
