import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../books.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
currentProduct:any;
discountedPrice:any;

activatedRoute=inject(ActivatedRoute)
bookServiceObj=inject(BooksService)
cartServiceObj=inject(CartService)


ngOnInit(): void {
  
  this.activatedRoute.queryParams.subscribe((res)=>{
    //here changes are emitted whenever there are changes to the query parameter
    this.bookServiceObj.getCurrentBook(res['isbn']).subscribe({
      next:(res)=>{
        
        this.currentProduct = res.payload;
        this.discountedPrice=this.cartServiceObj.getDiscountedPrice(this.currentProduct)
       
      }
    });
  });

 

  
}





}
