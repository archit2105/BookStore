import { Component, inject, OnInit,signal } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
cartItems:any=[]
cartServiceObj=inject(CartService)
router=inject(Router)


ngOnInit(): void {
 this.cartServiceObj.getAllCartItems().subscribe({
  next:(res)=>{
  
    this.cartItems=res.payload.cart
   
  }
 })
}
goToHome(){
  this.router.navigate(['/home'])
}
}
