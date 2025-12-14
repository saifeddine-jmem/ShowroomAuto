import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { Auto } from '../../interfaces/auto';
import { NgForOf, NgIf,CurrencyPipe } from '@angular/common';
import { WishlistService } from '../../services/wishlist.service';




@Component({
  selector: 'app-search-bar',
  imports: [NgForOf, NgIf,CurrencyPipe],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar implements OnInit {
  wishlistService = inject(WishlistService);
  @Input() autos:Auto[]=[];
   filtredAutos:Auto[]=[];
   @Output() onSelectAuto = new EventEmitter<Auto>();

  // UI state for filters and sorts
  category: string = ''; // empty means all
  sortBy: 'price-asc' | 'price-desc' | 'power-asc' | 'power-desc' | '' = '';
  brandQuery: string = '';

  ngOnInit() {
    this.filtredAutos = this.autos;
  }
  
  searchAutoList(brand:any) {
    this.brandQuery = (brand ?? '').toString();
    this.applyFiltersAndSort();
  }

  onCategoryChange(value: string) {
    this.category = value;
    this.applyFiltersAndSort();
  }

  onSortChange(value: string) {
    // narrow to allowed values
    const allowed = ['price-asc','price-desc','power-asc','power-desc',''];
    this.sortBy = (allowed.includes(value) ? value as any : '');
    this.applyFiltersAndSort();
  }

  private applyFiltersAndSort() {
    const brand = this.brandQuery.trim().toLowerCase();
    const category = this.category.trim().toLowerCase();

    let result = this.autos.filter(a => {
      const brandOk = brand ? a.brand.toLowerCase().startsWith(brand) : true;
      const categoryOk = category ? a.category.toLowerCase() === category : true;
      return brandOk && categoryOk;
    });

    switch (this.sortBy) {
      case 'price-asc':
        result = result.slice().sort((a,b) => a.price - b.price);
        break;
      case 'price-desc':
        result = result.slice().sort((a,b) => b.price - a.price);
        break;
      case 'power-asc':
        result = result.slice().sort((a,b) => a.power - b.power);
        break;
      case 'power-desc':
        result = result.slice().sort((a,b) => b.power - a.power);
        break;
      default:
        // no sort
        break;
    }

    this.filtredAutos = result;
  }
  showDetails(auto:Auto
  ){
    this.onSelectAuto.emit(auto);
  }

  toggleWishlist(event: Event, auto: Auto): void {
    event.stopPropagation();
    if (this.wishlistService.isInWishlist(auto.id)) {
      this.wishlistService.removeFromWishlist(auto.id);
    } else {
      this.wishlistService.addToWishlist(auto);
    }
  }

  isInWishlist(autoId: number): boolean {
    return this.wishlistService.isInWishlist(autoId);
  }
  
}

