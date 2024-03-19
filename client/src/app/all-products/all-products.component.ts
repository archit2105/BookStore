import { Component,OnInit,inject} from '@angular/core';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})
export class AllProductsComponent implements OnInit{
  bookServiceObj=inject(BooksService)
  books:any;

  
  ngOnInit(): void {
    this.bookServiceObj.getAllBooks().subscribe(
      (res)=>{
        if(res.message==="Get BookList"){
          this.books=res.payload;
          
          
        }
        
      },
    (error)=>{
      console.log(error)
    }
    );
  }
}
