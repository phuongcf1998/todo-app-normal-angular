import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import Swal from 'sweetalert2';
import { Status } from '../model/status';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
  @ViewChild('inputItem', { static: true }) inputItem!: ElementRef;

  addItem(newItem: string) {
    if (newItem === '') {
      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(' Input must not be blank !!!', '', 'error');
        } else if (result.isDenied) {
        }
      });
    } else {
      this.newItemEvent.emit({
        id: Date.now(),
        name: newItem,
        status: Status.Default,
      });
      this.inputItem.nativeElement.value = '';
    }
  }
}
