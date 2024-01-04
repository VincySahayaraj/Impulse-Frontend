import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/demo/Services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  enteredValues: any; 
  otpValue:any;
  employeeCode: any;
  userName: any;
  password: any;
  confirmPassword: any;
  newPassword: any;
  errorMsg: any;
  empinput: any;
  existCode: any;
  existDetails: any;
  invalid: any = false;
  notUser:any=false;
  passwordDetails: any;
  isempCode: any = true;
  loginres:any=true;
  isExisitingUser: any = false;
  passwordIncorrect:any=false;
  submitted: any = false;
  isOTPAvailable:any=false;
  newUserSubmitted:any=false;
  passwordSubmitted:any=false;
  newUser: any = false;
  userCheck: any;
  constructor(private loginservice: LoginService,private router:Router) {

  }

  ngOnInit() {

  }

  //check whether the user is new or exist
  checkNewUser(empCode: any, newPassword: any, confirmPassword: any) {

    this.passwordDetails = {
      userName: empCode,
      newPassword: newPassword,
      confirmPassword: confirmPassword

    }
    //if it is not valid then return
    if (!empCode && !newPassword && !confirmPassword) {
      return
    }
    this.newUserSubmitted=true;
    this.loginservice.checkNewUser(this.passwordDetails).subscribe((res) => {

      
      this.userCheck = res;
      if (this.userCheck) {

      }

    },
      // Handle bad request error, show message, redirect, etc.
      error => {
        if (error.status === 400) {
          console.log('Bad Request - Message New password:', error.error);
          this.errorMsg = error.error;
          // if (this.errorMsg.apiStatus == 2) {
          //   this.isempCode = false;
          //   this.newUser = true;
          // }

        }
      }
    )
  }

  //check whether the user is exist or new
  checkExistingUser(empCode: any) {

    this.submitted = true;
    console.log("emp code", empCode)
    if (!empCode) {
      return
    }
    this.empinput = {
      userName: empCode
    }
    this.loginservice.checkExistingUser(this.empinput).subscribe((res) => {
      console.log("login res", res)

      this.userCheck = res;
      if (this.userCheck.apiStatus == 0) {
        if(this.userCheck.result=='Not First Login'){
          this.isempCode = false;
          this.isExisitingUser = true;
         
        }
        else{
          this.isempCode = false;
          this.isExisitingUser = false;
          this.newUser = true;
        }
      }
    },
      // Handle bad request error, show message, redirect, etc.
      error => {
        if (error.status === 400) {
          console.log('Bad Request - Message:', error.error);
          this.errorMsg = error.error;

          //for testing purpose
          if(this.errorMsg.apiStatus == 1){
            if(this.errorMsg.result=='Not First Login'){

            }
            else if(this.errorMsg.result=='First Login'){
             
              this.newUser = true;
              this.isempCode = false;
              console.log("password")
            }
            else{
              this.notUser = true;
            }
          }


          if (this.errorMsg.apiStatus == 2) {
            // this.isempCode = false;
            this.notUser = true;
           
            
             
             
          }
        }
      }
    )
  }

  //get code for exist user
  loginUser(userName: any, password: any) {
    this.passwordSubmitted=true;
    this.existDetails = {
      userName: userName,
      password: password
    }
    //if it is not valid then return
    if (!userName && !password) {
      return
    }
    this.loginservice.loginforExistUser(this.existDetails).subscribe((res) => {
      console.log("login success", res)

      this.loginres=res

      this.router.navigate(['/default']);

      
      // if (this.userCheck.apiStatus==0) {
      //   this.isempCode = false;
      // }

    },
      // Handle bad request error, show message, redirect, etc.
      error => {
        if (error.status === 400) {
          console.log('Bad Request - Message:', error.error);
          this.errorMsg = error.error;
          if(this.errorMsg.apiStatus==2){
            if(this.errorMsg.result=='Password does not match'){
              this.passwordIncorrect=true;
            }
          }
        }
      }
    )
  }



  clickOTP(event: Event, lastId: string) {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.value.length) {
      const lastInput = document.getElementById(lastId) as HTMLInputElement;
      if (lastInput) {
        lastInput.focus();
      }
    }
    this.collectEnteredValues();
  }

  collectEnteredValues() {
    const inputs = document.querySelectorAll('.userInput input') as NodeListOf<HTMLInputElement>;

    this.enteredValues = Array.from(inputs).map(input => input.value).join(",");
    this.otpValue = this.enteredValues.replace(/,/g, '');
    console.log("entered values",this.otpValue)

   
  }
}
