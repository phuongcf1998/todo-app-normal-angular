import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Item } from './model/item';
import { Status } from './model/status';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todo-app-normal';
  items: Item[] = [];

  itemsSuccess: Item[] = [];

  addItem(newItem: Item) {
    let isDuplicateInSuccessItem: boolean = false;

    let isDuplicateInDefaultItem: boolean = false;

    this.items.forEach((element) => {
      if (element.name.trim().toLowerCase() === newItem.name.toLowerCase()) {
        isDuplicateInDefaultItem = true;
      }
    });

    this.itemsSuccess.forEach((element) => {
      if (element.name.trim().toLowerCase() === newItem.name.toLowerCase()) {
        isDuplicateInSuccessItem = true;
      }
    });

    if (
      isDuplicateInDefaultItem === false &&
      isDuplicateInSuccessItem === false
    ) {
      this.items.push(newItem);

      this.sortItem(this.items);
    } else {
      Swal.fire({
        title: 'Do you want to save the changes?',

        showDenyButton: true,

        showCancelButton: true,

        confirmButtonText: 'Save',

        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Item name is duplicate', '', 'error');
        } else if (result.isDenied) {
        }
      });
    }
  }

  sortItem(items: Item[]) {
    items.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
  }

  handleSuccessItem(item: Item) {
    item.status = Status.Complete;

    const index = this.items.indexOf(item);

    this.items.splice(index, 1);

    this.itemsSuccess.push(item);

    this.sortItem(this.itemsSuccess);
  }

  handleDeleteItemDefault(item: Item) {
    const index = this.items.indexOf(item);

    this.items.splice(index, 1);
  }

  handleDeleteItemSuccess(item: Item) {
    const index = this.items.indexOf(item);

    this.itemsSuccess.splice(index, 1);
  }
}
