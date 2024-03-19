import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { UserService } from '../user.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
@Input() book:any;//to accept from home component
id:any;
router=inject(Router)
isProductInCart:boolean=false;
cartServiceObj=inject(CartService)
userService=inject(UserService)
toast = inject(NgToastService);

status=this.userService.headerStatus;


ngOnInit(): void {
  this.id={'isbn':this.book.isbn};//obj since we send obj to query param



}


//to add book in cart
addToCart(book:any)
{
if(this.status()){
  this.cartServiceObj.addProductToCart(book).subscribe({
  next:(res)=>{
    console.log(res,"Done")
    
  },
  
    error:(err)=>{
      console.log(err)
    
  }
});
//to change the status of cart so that add to cart can be changed to go to cart
this.isProductInCart=true;
}else{
  
  this.router.navigate(['/login'])
}

}

}
