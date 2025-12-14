import { Component, EventEmitter, Output, inject } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { Auto } from '../../interfaces/auto';
import { NgForOf, NgIf, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  imports: [NgForOf, NgIf, CurrencyPipe],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css'
})
export class Wishlist {
  wishlistService = inject(WishlistService);
  @Output() onSelectAuto = new EventEmitter<Auto>();
  @Output() onClose = new EventEmitter<void>();

  removeFromWishlist(autoId: number, event: Event): void {
    event.stopPropagation();
    this.wishlistService.removeFromWishlist(autoId);
  }

  clearAll(): void {
    if (confirm('Are you sure you want to clear all items from your wishlist?')) {
      this.wishlistService.clearWishlist();
    }
  }

  exploreAuto(auto: Auto): void {
    this.onSelectAuto.emit(auto);
    this.onClose.emit();
  }

  close(): void {
    this.onClose.emit();
  }
}
