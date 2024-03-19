import { HttpClient } from '@angular/common/http';
import { Component ,inject,OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import {Book} from '../models/Book'

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent implements OnInit{
bookForm:FormGroup;
router=inject(Router)
bookServiceObj=inject(BooksService)
httpClient=inject(HttpClient)


ngOnInit(): void {
  this.bookForm=new FormGroup({
    Titel:new FormControl('',Validators.required),
    isbn:new FormControl('',Validators.required),
    pageCount:new FormControl('',Validators.required),
    image:new FormControl('',Validators.required),
    shortDescription:new FormControl('',Validators.required),
    longDescription:new FormControl('',Validators.required),
    author:new FormControl('',Validators.required),
    categories:new FormControl('',Validators.required),
    price:new FormControl('',Validators.required),
    discount:new FormControl('',Validators.required)


  })
}
onSubmitBook(){
  let{ Titel,isbn, pageCount,image, shortDescription,longDescription,author,categories,price,discount}=this.bookForm.value;
  let newBook=new Book(Titel,isbn, pageCount,image, shortDescription,longDescription,author,categories,price,discount)
  this.bookServiceObj.createBook(newBook).subscribe({
    next:(res)=>{
      if(res.message==='Book created'){
        this.bookForm.reset()
      }else{

      }
    },
    error:(error)=>{
      console.log("err in book creation",error)
    }
  })

}
}
