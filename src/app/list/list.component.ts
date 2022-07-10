import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Item } from '../model/item';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor() {}
  @Input() items: Item[] = [];
  @Input() itemsSuccess: Item[] = [];
  @Output() successItem = new EventEmitter();
  @Output() deleteItemDefault = new EventEmitter();
  @Output() deleteItemSuccess = new EventEmitter();
  ngOnInit(): void {}
  handleSuccessItem(item: Item) {
    this.successItem.emit(item);
  }
  handleDeleteItemDefault(item: Item) {
    this.deleteItemDefault.emit(item);
  }
  handleDeleteItemSuccess(item: Item) {
    this.deleteItemSuccess.emit(item);
  }
}
