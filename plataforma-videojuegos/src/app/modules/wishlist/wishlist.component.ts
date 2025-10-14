import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

interface Product {
  name: string;
  category: string;
  image: string;
  price: number;
  rating: number;
  inventoryStatus: 'INSTOCK' | 'LOWSTOCK' | 'OUTOFSTOCK';
}

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, DataViewModule, ButtonModule, FormsModule],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  
  layout: 'list' | 'grid' = 'list';

  sortOptions = [
    { label: 'Name Asc', value: 'name' },
    { label: 'Name Desc', value: '!name' },
    { label: 'Price Asc', value: 'price' },
    { label: 'Price Desc', value: '!price' }
  ];

  sortField: string = 'name';
  sortOrder: number = 1;

  onSortChange(event: any) {
    const value = event.value;
    if (value.startsWith('!')) {
      this.sortOrder = -1;
      this.sortField = value.substring(1);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }


  getImageUrl(image: string) {
  return 'assets/images/' + image;
}

  products(): Product[] {
    return [
      { name: 'Katana Zero', category: 'Indie', image: 'katana.jpg', price: 20, rating: 4.5, inventoryStatus: 'INSTOCK' },
      { name: 'Dark Souls Remastered', category: 'RPG', image: 'DarkSouls.jpg', price: 60, rating: 5, inventoryStatus: 'LOWSTOCK' },
      { name: 'Final Fantasy IX', category: 'RPG', image: 'finalFantasy.jpg', price: 5, rating: 5, inventoryStatus: 'OUTOFSTOCK' }
    ];
  }
}
