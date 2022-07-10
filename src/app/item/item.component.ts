import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core';
import { Item } from '../model/item';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() items: Item[] = [];
  @Input() itemsSuccess: Item[] = [];
  @Output() successItem = new EventEmitter();
  @Output() deleteItemDefault = new EventEmitter();
  @Output() deleteItemSuccess = new EventEmitter();
  constructor(private elm: ElementRef) {}
  isSuccess = '';
  hideBtn = '';

  lineThrough = 'line-through';
  //#22C55E
  //#a5dc86
  greenColor = '#22C55E';

  fontSize = '1.5rem';
  redColor = 'red';

  toastSw(iconType: any, message: string) {
    let toastMixin = Swal.mixin({
      toast: true,
      icon: iconType,
      title: 'General Title',

      position: 'top-right',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
    toastMixin.fire({
      title: 'Result',
      html: message,
    });
  }

  pushSuccessItem(element: any, item: Item) {
    Swal.fire({
      html: `Are you sure you have finished <span style="color:${this.greenColor}">${item.name}</span> ???`,
      text: "You won't be able to revert this!",
      icon: 'success',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, i finished it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.toastSw(
          'success',
          `<span style="color:${this.greenColor}">${item.name}</span> has been finished !`
        );

        setTimeout(() => {
          this.successItem.emit(item);
         
        }, 700);
      }
    });
  }
  deleteItemByType(item: Item, type: string) {
    Swal.fire({
      html: `Do you want to delete <span style="color:${this.redColor}">${item.name}</span> ?`,
      showDenyButton: true,
      icon: 'error',
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        if (type === 'success') {
          this.deleteItemSuccess.emit(item);
          this.toastSw(
            'error',
            `<span style="color:${this.redColor}">${item.name}</span> has been deleted !`
          );
        } else {
          this.toastSw(
            'error',
            `<span style="color:${this.redColor}">${item.name}</span> has been deleted !`
          );
          setTimeout(() => {
            this.deleteItemDefault.emit(item);
          }, 700);
        }
      } else if (result.isDenied) {
      }
    });
  }

  ngOnInit(): void {}
}
