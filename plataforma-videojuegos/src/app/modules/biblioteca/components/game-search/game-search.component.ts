import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-game-search',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    FormsModule
  ],
  templateUrl: './game-search.component.html',
  styleUrls: ['./game-search.component.css']
})
export class GameSearchComponent {


  @Input() placeholder: string = 'Buscar en tu biblioteca...';

  @Input() disabled: boolean = false;

  @Input()
  set initialValue(value: string) {
    this.searchTerm = value;
  }


  @Output() onSearch = new EventEmitter<string>();

  @Output() onClear = new EventEmitter<void>();



  searchTerm: string = '';

  handleSearchInput(): void {
    this.onSearch.emit(this.searchTerm);
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.onClear.emit();
    this.onSearch.emit('');
  }

  hasSearchTerm(): boolean {
    return this.searchTerm.trim().length > 0;
  }
}
