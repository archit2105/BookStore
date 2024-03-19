import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import {login} from '../models/login'
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {
  loginForm:FormGroup;
  router=inject(Router)
  toast = inject(NgToastService);
  userCredentialsError = {
    userCredErrStatus: false,
    userCredErrMsg: "",
  };

  sellerCredentialsError={
    sellerCredErrStatus:false,
    sellerCredErrMsg:"",
  }

  userServiceObj=inject(UserService)
  type:string="password";
  isText:boolean=false;
  logStatus:boolean=false;
  eyeIcon:string="fa-eye-slash"
  httpClientObj=inject(HttpClient)
  




  ngOnInit():void{
    localStorage.removeItem("token")
    this.loginForm=new FormGroup({
      username:new FormControl('',Validators.required),
    
      password:new FormControl('',[Validators.required,Validators.minLength(6)])
    })
  
   
  }
  
  hideShowPass(){
    this.isText=!this.isText;
    this.isText?this.eyeIcon="fa-eye": this.eyeIcon="fa-eye-slash"
    this.isText? this.type="text":this.type="password"
  }
      
  
  get username(){
    return this.loginForm.get('username')
  }
 
  
  get password(){
    return this.loginForm.get('password')
  }


  onSubmitUser() {
    
    this.userServiceObj.userLogin(this.loginForm.value).subscribe({
      next: (res) => {
       
        //this will check the messege is logoin success or not
        if (res.message === "login success") {
          //store token in local/session storage
          localStorage.setItem("token", res.token);
          //set user status & current user to service
          this.userServiceObj.setUserLoginStatus(true)
          this.userServiceObj.setCurrentUser(res.user)
        

          this.userServiceObj.Status.set(true)
          this.userServiceObj.loginUsername.set(this.loginForm.value.username)
          this.userServiceObj.headerStatus.set(true)

          this.toast.success({
            detail:"User Login Sucessful",
            summary:"Successful",
            duration:2000,
            position:'topCenter'
          })

          this.router.navigate(['/home']);
        } else {
          //if login credential are invalid
          this.userCredentialsError = {
            userCredErrStatus: true,
            userCredErrMsg: res.message,
          };
        }
      },
      error: (error) => {
        console.log("err in user login", error);
      },
    });
  }

  loginStatus(){
    this.logStatus=!this.logStatus;
    }

  onSubmitSeller(){
    this.userServiceObj.sellerLogin(this.loginForm.value).subscribe({
      next:(res)=>{
         //this will check the messege is logoin success or not
         console.log(res)
         if (res.message === "login success") {
           //store token in local/session storage
           localStorage.setItem("token", res.token);
           //set seller status & current seller to service
           this.userServiceObj.setSellerLoginStatus(true)
           this.userServiceObj.setCurrentSeller(res.seller)

           //set seller status signal true
           this.userServiceObj.sellerStatus.set(true);
           
           //navigate to user profile
           this.userServiceObj.headerStatus.set(true)
         
           this.toast.success({
            detail:"Seller Login Sucessful",
            summary:"Successful",
            duration:2000,
            position:'topCenter'
          })

           this.router.navigate([`/create-product`]);
         } else {
           //if login credential are invalid
           this.sellerCredentialsError = {
             sellerCredErrStatus: true,
             sellerCredErrMsg: res.message,
           };
         }
      }
    })
  }

}
