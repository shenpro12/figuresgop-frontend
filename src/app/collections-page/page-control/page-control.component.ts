import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import {
  faArrowLeftLong,
  faArrowRightLong,
  faSort,
  faComputerMouse,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'page-control',
  templateUrl: './page-control.component.html',
  styleUrls: ['./page-control.component.css'],
})
export class PageControlComponent implements OnChanges {
  @Input() totalItemPerView: number = 0;
  @Input() currentPage: number = 1;
  @Input() totalItem: number = 0;
  @Output() onChangePageNumber = new EventEmitter();
  pageNumber: Array<number> = [];
  faArrowLeftLong = faArrowLeftLong;
  faArrowRightLong = faArrowRightLong;
  faSort = faSort;
  faComputerMouse = faComputerMouse;
  inputPageNumber: number | string = '';
  ngOnChanges(): void {
    this.pageNumber = [];
    for (let i = this.currentPage - 2; i <= this.currentPage + 2; i++) {
      this.pageNumber.push(i);
    }
    this.pageNumber = this.pageNumber.filter(
      (i) => i > 0 && i <= Math.ceil(this.totalItem / this.totalItemPerView)
    );
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
  changPageNumber(e?: number | string) {
    if (!e) {
      this.onChangePageNumber.emit(
        Math.ceil(this.totalItem / this.totalItemPerView)
      );
    } else if (e != this.currentPage && typeof e == 'number') {
      this.onChangePageNumber.emit(e);
    } else if (
      e != this.currentPage &&
      typeof e == 'string' &&
      Number.parseInt(e) <= Math.ceil(this.totalItem / this.totalItemPerView) &&
      Number.parseInt(e) > 0
    ) {
      this.inputPageNumber = '';
      document.getElementById('input')?.click();
      this.onChangePageNumber.emit(Number.parseInt(e));
    }
  }
}
