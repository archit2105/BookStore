import { HttpClient } from '@angular/common/http';
import { Injectable , inject, signal} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './models/User';
import { Seller } from './models/Seller';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  headerStatus = signal(false);

  httpClient=inject(HttpClient)
  userLoginStatus=new BehaviorSubject<boolean>(false)//to broadcast the status to header
  currentUser=new BehaviorSubject<User>({
    username:'',
    email:'',
    password:''
  })

  sellerStatus=signal(false);
  sellerLoginStatus=new BehaviorSubject<boolean>(false)
  currentSeller=new BehaviorSubject<Seller>({
    username:'',
    email:'',
    password:''
  })

  // signal
userloginType=signal('')
Status=signal(false)
loginUsername=signal('')

  setUserLoginStatus(value:boolean){
this.userLoginStatus.next(value)
  }

  setCurrentUser(user:User){
    this.currentUser.next(user);
  }

  getUserLoginStatus(){//this is used by header component 
   return this.userLoginStatus.asObservable()
  }
  getCurrentUser(){
    return this.currentUser.asObservable();
  }



  userLogout(){
    this.setUserLoginStatus(false)
    this.headerStatus.set(false)
     //remove token from localstorage
    
     //reset current user
   
     //reset login status
     this.setCurrentUser({
       username:'',
       email:'',
       password:''
     })

     localStorage.removeItem('token')
     this.sellerLoginStatus.next(false)
    
  }
  

  //Create User(user registration )
  createUser(newUser): Observable<any> {
    return this.httpClient.post('http://localhost:4000/user-api/user', newUser);
  }

//user login
userLogin(userCredObj): Observable<any> {
 
  return this.httpClient.post(
    'http://localhost:4000/user-api/login',userCredObj
  );
  
}

createSeller(newSeller): Observable<any> {
  return this.httpClient.post('http://localhost:4000/seller-api/seller', newSeller);
}
    
//seller login
sellerLogin(sellerCredObj): Observable<any>{
  console.log(sellerCredObj);
  return this.httpClient.post('http://localhost:4000/seller-api/login',sellerCredObj)
}
setSellerLoginStatus(value:boolean){
  this.sellerLoginStatus.next(value)
    }
  

    setCurrentSeller(seller:Seller){
      this.currentSeller.next(seller);
    }
    getSellerLoginStatus(){//this is used by header component 
      return this.sellerLoginStatus.asObservable()
     }

     getCurrentSeller(){
      return this.currentSeller.asObservable();
    }
    sellerLogout(){
      //reset current user
      this.setSellerLoginStatus(false)
      //reset login status
      this.setCurrentSeller({
        username:'',
        email:'',
        password:''
      })
      //remove token from localstorage
      localStorage.removeItem('token')
   }
   
}

