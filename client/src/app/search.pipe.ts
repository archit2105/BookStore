import { inject, Pipe, PipeTransform,signal} from '@angular/core';
import { BooksService } from './books.service';

@Pipe({
  name: 'search'
})

export class SearchPipe implements PipeTransform {
  
bookService = inject(BooksService)
  
  transform(books: any[], searchText: any): any {
    
    if(!searchText){//if searchText is empty we need to flash all the books
    return books;
  }
return books.filter((book:any)=>{
  return book.Titel.toLowerCase().includes(searchText.toLowerCase());
})
}
}
