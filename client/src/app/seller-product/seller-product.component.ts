import { Component,inject,Input,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-seller-product',
  templateUrl: './seller-product.component.html',
  styleUrl: './seller-product.component.css'
})
export class SellerProductComponent  {

  @Input() book:any;
  router=inject(Router)
  toast = inject(NgToastService);
  
  
bookServiceObj=inject(BooksService)
  deleteBook(isbn){
    this.bookServiceObj.deleteBook(isbn).subscribe({
      next:(res)=>{
        if(res.message==="book deleted"){
 this.toast.error({
          detail:"Book Deleted",
          summary:"Successful",
          duration:4000,
          position:'topCenter'
        })
          this.router.navigate([`/create-product`]);
        }
      }
    })
  }
}
