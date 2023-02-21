import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Filter } from '../collections-page.component';

@Component({
  selector: 'current-filter',
  templateUrl: './current-filter.component.html',
  styleUrls: ['./current-filter.component.css'],
})
export class CurrentFilterComponent {
  @Input() filter: Filter = {
    manufactuter: [],
    price: [],
    scale: [],
    sort: [],
  };
  @Output() onClearFilter = new EventEmitter();
  faClose = faClose;
  getText(arr: Array<string>): string {
    let str: string = '';
    arr.map((i, index) => {
      if (index < arr.length - 1) {
        str += `${i}, `;
      } else {
        str += `${i}`;
      }
    });
    return str;
  }
  clearManufacturer() {
    this.filter.manufactuter = [];
    this.onClearFilter.emit(this.filter);
  }
  clearPrice() {
    this.filter.price = [];
    this.onClearFilter.emit(this.filter);
  }
  clearScale() {
    this.filter.scale = [];
    this.onClearFilter.emit(this.filter);
  }
  clearFilter() {
    this.clearManufacturer();
    this.clearPrice();
    this.clearScale();
    this.onClearFilter.emit(this.filter);
  }
  checkToltalFillter(): boolean {
    let element = document.getElementsByClassName('fillterItem');
    if (element.length > 1) {
      return true;
    }
    return false;
  }
}
