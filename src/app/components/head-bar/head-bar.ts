import { Component, EventEmitter, Output, inject } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-head-bar',
  imports: [],
  templateUrl: './head-bar.html',
  styleUrl: './head-bar.css',
})
export class HeadBar {
  wishlistService = inject(WishlistService);
  @Output() onToggleWishlist = new EventEmitter<void>();

  toggleWishlist(): void {
    this.onToggleWishlist.emit();
  }
}
