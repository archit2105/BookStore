import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import{User} from'../models/User'
import{Seller} from '../models/Seller'
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
registerForm:FormGroup;
router=inject(Router)
duplicateUserStatus:boolean=false;
regStatus:boolean=false;
userService=inject(UserService)
type:string="password";
isText:boolean=false;
eyeIcon:string="fa-eye-slash"
toast = inject(NgToastService);

httpClient=inject(HttpClient)

ngOnInit():void{
  this.registerForm=new FormGroup({
    username:new FormControl('',Validators.required),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(6)])
  })

 
}

onSubmitUser(){
  let{username,email,password}=this.registerForm.value;
  let newUser=new User(username,email,password)
  this.userService.createUser(newUser).subscribe({
    next:(res)=>{
      
      //navigate to login component
      if(res.message==='User created'){

        this.toast.success({
          detail:"User Registered",
          summary:"Successful",
          duration:2000,
          position:'topCenter'
        })
       
       this.router.navigate(['/login'])
       this.registerForm.reset()
      }else{
        this.registerForm.reset()
        this.duplicateUserStatus=true;
      }
    },
    error:(error)=>{
      console.log("err in user creation",error)
    }
    

})
}
onSubmitSeller(){
  let{username,email,password}=this.registerForm.value;
  let newSeller=new Seller(username,email,password)
  this.userService.createSeller(newSeller).subscribe({
    next:(res)=>{
      
      //navigate to login component
      if(res.message==='Seller created'){
       this.router.navigate(['/login'])
       this.registerForm.reset();
      }else{
        this.duplicateUserStatus=true;
      }
    },
    error:(error)=>{
      console.log("err in user creation",error)
    }
    

})
}
registrationStatus(){
this.regStatus=!this.regStatus;
}




hideShowPass(){//for visibility of password
  this.isText=!this.isText;
  this.isText?this.eyeIcon="fa-eye": this.eyeIcon="fa-eye-slash"
  this.isText? this.type="text":this.type="password"
}
    

get username(){
  return this.registerForm.get('username')
}
get email(){
  return this.registerForm.get('email')
}

get password(){
  return this.registerForm.get('password')
}


goToLogin(){
  this.router.navigate(['/login'])
}
}
