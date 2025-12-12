import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Auto } from '../../interfaces/auto';
import { NgForOf, NgIf,CurrencyPipe } from '@angular/common';




@Component({
  selector: 'app-search-bar',
  imports: [NgForOf, NgIf,CurrencyPipe],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar implements OnInit {
  @Input() autos:Auto[]=[];
   filtredAutos:Auto[]=[];
   @Output() onSelectAuto = new EventEmitter<Auto>();

  ngOnInit() {
    this.filtredAutos = this.autos;
  }
  
  searchAutoList(brand:any) {
    
    this.filtredAutos = this.autos.filter(auto => auto.brand.toLowerCase().startsWith(brand.toLowerCase()));
    
  }
  showDetails(auto:Auto
  ){
    this.onSelectAuto.emit(auto);
  }
  
}

