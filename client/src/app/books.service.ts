import { HttpClient } from '@angular/common/http';
import { compileNgModule } from '@angular/compiler';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {




  // baseUrl='http://localhost:4000/';
  books:any = signal([]);//to store all the books

  searchText:any=''; //for searchBar
  searchSubject=new Subject();//for broadcasting
  filteredBooks:any;//to get the filtered books in our array according the sort 
  sortCriterion:any ;
  sortSubject=new Subject();

priceFilter:any;

//price filter subject to broadcast to home component
priceFilterSubject=new Subject();
  httpClient=inject(HttpClient)

  

  getAllBooks():Observable<any>{


    return this.httpClient.get("http://localhost:4000/book-api/books")


  }

  


  
  //sorting functionality
 
  getSortCriterion(criterion:any){//to get only the criteria
this.sortCriterion=criterion;
//this to send what type of sort we have to do to the home component
this.sortSubject.next(this.sortCriterion)
  }





  sortBooks(criteria:any){
    this.filteredBooks = this.books();
    switch(criteria){
      case 'Price(Low to High)':
        this.filteredBooks.sort((a:any,b:any)=>{
          if(a.price<b.price){
            return -1;//move a to low index
          }
          if(a.price>b.price){
            return 1;//move a to greater index
          }
          return 0;//maintain current order
        });
        break;
        case 'Price(High to Low)':
          this.filteredBooks.sort((a:any,b:any)=>{
            if(a.price<b.price){
              return 1;
            }
            if(a.price>b.price){
              return -1;
            }
            return 0;
          });
          break;
      
    }
    return this.filteredBooks;
  }




  
getPriceFilter(price:any){
  this.priceFilter=price;
  this.priceFilterSubject.next(this.priceFilter);
}
  
getFilteredBooksByPrice(price:any){
  return this.filteredBooks=this.books().filter((book:any)=>{
    
    return book.price<=price;
  })
}

getCurrentBook(id:any):Observable<any>{
  
  return this.httpClient.get("http://localhost:4000/book-api/book/"+id)
}

getSearchString(searchText:any){
  this.searchText=searchText;//recieving the search text from header
this.searchSubject.next(this.searchText)
}

createBook(newBook):Observable<any>{
  return this.httpClient.post('http://localhost:4000/book-api/book',newBook,
  {
    headers:{
      authorization:localStorage.getItem('token')
    }
   })
}

deleteBook(isbn):Observable<any>{
  return this.httpClient.delete('http://localhost:4000/book-api/book/'+isbn,
  {
    headers:{
      authorization:localStorage.getItem('token')
    }
   } )
  
}










}
