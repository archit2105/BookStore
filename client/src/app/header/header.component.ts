import { Component, inject, OnInit,signal, computed} from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { CartService } from '../cart.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

//to store whatever we write in search bar
  searchText:any='';

//sort by menu
isSortMenuVisible:boolean=false;
criteria:any[]=['Price(Low to High)','Price(High to Low)']//array for sort criteria 
cartServiceObj=inject(CartService)
bookServiceobj=inject(BooksService)



userServiceObj=inject(UserService)

sellerStatus:any;





constructor(){
  if(localStorage.getItem('token')){
    
    this.userServiceObj.headerStatus.set(true);
    
    this.userServiceObj.getSellerLoginStatus().subscribe({
      next:(sellerLoginStatus)=>this.sellerStatus=sellerLoginStatus
    })
   
  }else{
    this.userServiceObj.headerStatus.set(false);
  }

}




ngOnInit(): void {
  


// this.userServiceObj.getUserLoginStatus().subscribe({//geting status of login or logout from userservice
//   next:(userLoginStatus)=>this.status=userLoginStatus
// })
this.userServiceObj.getSellerLoginStatus().subscribe({
  next:(sellerLoginStatus)=>this.sellerStatus=sellerLoginStatus
})




}


showSortMenu(){
  this.isSortMenuVisible=!this.isSortMenuVisible //to show sort menu
}



sortBooks(criterion:any){
this.bookServiceobj.getSortCriterion(criterion)
}




searchBook(searchText:any){
this.bookServiceobj.getSearchString(searchText); //passing the value of text to book service where we have getSearchString
}
}
