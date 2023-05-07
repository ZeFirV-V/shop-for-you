import { Component, EventEmitter, Output } from '@angular/core';
import {SortOption, SortOrder} from "../../models/product";

@Component({
  selector: 'app-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.scss']
})
export class SidebarComponent {
  currentSortOption: SortOption | undefined;
  currentSortOrder: SortOrder | undefined;
  currentCategory: string = 'all';
  categories: string[] = ['1', '2', '3', '4'];
  searchValue: string = '';

  filters: {name: string, value: SortOption}[] = [
    {name: 'название', value: 'title'},
    {name: 'цена', value: 'price'},
    {name: 'категория', value: 'category'},
    {name: 'рейтинг', value: 'rating'},
  ];
  @Output() sortOptionChanged = new EventEmitter<SortOption>();
  @Output() sortOrderChanged = new EventEmitter<SortOrder>();
  @Output() categoryChanged = new EventEmitter<string>();
  @Output() searchChanged = new EventEmitter<string>();

  onSortOptionChange() {
    this.sortOptionChanged.emit(this.currentSortOption);
    console.log(123)
  }

  onSortOrderChange() {
    this.sortOrderChanged.emit(this.currentSortOrder);
  }

  onCategoryChange() {
    this.categoryChanged.emit(this.currentCategory);
  }

  onSearch() {
    this.searchChanged.emit(this.searchValue);
  }
}
