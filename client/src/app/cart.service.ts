import { HttpClient } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from './models/User';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartProducts:any[]=[];//this will store all the books we add in our cart
 
cartSubject=new Subject();

userServiceObj=inject(UserService)


httpClient=inject(HttpClient)
username=this.userServiceObj.loginUsername


//to add books that we are adding to cart component
//this will be called from product component
  addProductToCart(product:any):Observable<any>{

return this.httpClient.put(`http://localhost:4000/user-api/user/${this.username()}`,product)
  }

  getAllCartItems():Observable<any>
  {
    //  return this.cartProducts;
    return this.httpClient.get(`http://localhost:4000/user-api/user/${this.username()}`)
  }

  //for cart items component we need discounted price and item price
  getPriceDetailsInCartItem(product:any){
let priceDetails={
 
  discountedPrice:(product.price)-(product.discount)/100*(product.price),
  price:product.price
  
}
return priceDetails;
  }




  removeItemFromCart(isbn:number):Observable<any>{
   
  return this.httpClient.post(`http://localhost:4000/user-api/user/${this.username()}`,{abc:isbn},
 {
  headers:{
    authorization:localStorage.getItem('token')
  }
 } 
  )
  }

  getBilling(cartItems:any){
    let billingDetails={
      price:0,
      discount:0,
      delivery:200

    }
    cartItems.forEach((item:any)=>{//since cart item is an array 
      billingDetails.price=billingDetails.price+(item.price);
      billingDetails.discount=billingDetails.discount+((item.discount/100*item.price));
      
    });
  return billingDetails;
  }

  

  getDiscountedPrice(currentItem:any){
   
    return currentItem.price-(currentItem.discount)/100*currentItem.price;
    
  }
}
