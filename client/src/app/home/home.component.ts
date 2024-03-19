import { Component, inject, OnInit, signal } from '@angular/core';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
books:any;
searchText:any;
bookServiceObj=inject(BooksService)

booksInService = signal([])



ngOnInit(): void {
  //to get books from our book service
  this.booksInService = this.bookServiceObj.books;
  this.bookServiceObj.getAllBooks().subscribe(
    (res)=>{
      if(res.message==="Get BookList"){
        this.books=res.payload;
        this.booksInService.set(res.payload)
        
      }
      
    },
  (error)=>{
    console.log(error)
  }
  );


  this.bookServiceObj.sortSubject.subscribe((sortCriterion:any)=>{//getting criteria from service
    this.books=this.bookServiceObj.sortBooks(sortCriterion);
    //sending the criteria back to service
    
  });
  this.bookServiceObj.priceFilterSubject.subscribe((price:any)=>{
    this.bookServiceObj.getAllBooks().subscribe((res)=>{//we are getting all books since ngOninit runs for once only
      this.books=res.payload;
      this.books=this.bookServiceObj.getFilteredBooksByPrice(price);
    })
  })
  this.bookServiceObj.searchSubject.subscribe((searchString:any)=>{
this.searchText=searchString;//here home component is recieving the response from the search Subject
  })
}
}
