import { Injectable, signal, computed } from '@angular/core';
import { Auto } from '../interfaces/auto';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistItems = signal<Auto[]>([]);
  
  // Computed signals
  items = this.wishlistItems.asReadonly();
  count = computed(() => this.wishlistItems().length);
  
  constructor() {
    // Load from localStorage on init
    this.loadFromStorage();
  }

  addToWishlist(auto: Auto): void {
    const current = this.wishlistItems();
    if (!current.find(item => item.id === auto.id)) {
      this.wishlistItems.set([...current, auto]);
      this.saveToStorage();
    }
  }

  removeFromWishlist(autoId: number): void {
    const current = this.wishlistItems();
    this.wishlistItems.set(current.filter(item => item.id !== autoId));
    this.saveToStorage();
  }

  clearWishlist(): void {
    this.wishlistItems.set([]);
    this.saveToStorage();
  }

  isInWishlist(autoId: number): boolean {
    return this.wishlistItems().some(item => item.id === autoId);
  }

  private saveToStorage(): void {
    localStorage.setItem('wishlist', JSON.stringify(this.wishlistItems()));
  }

  private loadFromStorage(): void {
    const stored = localStorage.getItem('wishlist');
    if (stored) {
      try {
        this.wishlistItems.set(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load wishlist from storage', e);
      }
    }
  }
}
