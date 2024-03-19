import { Component, inject, OnInit } from '@angular/core';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.css'
})
export class SidePanelComponent implements OnInit{
isPriceFiltersVisible:boolean=false;
priceFilters=[500,1000,1500,2000,5000];

bookServiceObj=inject(BooksService)

ngOnInit(): void {


  }
  showPriceFilters(){
    this.isPriceFiltersVisible=!this.isPriceFiltersVisible
  }

  filterBooksByPrice(priceFilter:any){
this.bookServiceObj.getPriceFilter(priceFilter);
  }

}

