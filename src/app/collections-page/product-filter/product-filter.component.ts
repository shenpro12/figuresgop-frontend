import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  faArrowDownWideShort,
  faSort,
  faFilter,
  faAngleDown,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { FomatDataHelper } from 'src/app/helper/fomatData.helper';

import { Filter } from '../collections-page.component';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css'],
})
export class ProductFilterComponent {
  @Input() title: string = '';
  @Input() filter: Filter = {
    manufactuter: [],
    price: [],
    scale: [],
    sort: [],
  };
  @Output() onChooseFilter = new EventEmitter();
  faArrowDownWideShort = faArrowDownWideShort;
  faSort = faSort;
  faFilter = faFilter;
  faAngleDown = faAngleDown;
  faCheck = faCheck;

  toggleSort: boolean = false;
  toggleClassify: boolean = false;
  classifyHeader: string = '';
  sortHeader: string = '';
  manufacturer = [
    'FREEING',
    'SQUARE ENIX',
    'GOOD SMILE COMPANY',
    'KOTOBUKIYA',
    'PROOF',
    'AMAKUNI',
    'APEX',
    'NETEASE GAMES',
    'KADOKAWA',
    'TOYSEIIKI',
    'MYETHOS',
    'VERY COOL',
    'GOMORA KICK',
    'BANDAI SPIRITS',
    'NEONMAX',
    'STORM COLLECTIBLES',
    'MARCHENPUNCH',
  ];
  price = [
    'Dưới 1.000.000₫',
    'Dưới 2.000.000₫',
    'Dưới 3.000.000₫',
    'Dưới 4.000.000₫',
  ];
  scale = ['1/12', '1/10', '1/8', '1/7', '1/6', '1/5', '1/4', '1/3'];
  sort = [
    'Giá: Tăng dần',
    'Giá: Giảm dần',
    'Tên: A-Z',
    'Tên: Z-A',
    'Cũ nhất',
    'Mới nhất',
  ];
  constructor(private fomatHelper: FomatDataHelper) {}
  changeManufacturer(e: any) {
    this.fomatHelper.setFilter(
      this.filter.manufactuter,
      e.target.value,
      e.target.checked
    );
    this.onChooseFilter.emit(this.filter);
  }
  changePrice(e: any) {
    this.fomatHelper.setFilter(
      this.filter.price,
      e.target.value,
      e.target.checked
    );
    this.onChooseFilter.emit(this.filter);
  }
  changeScale(e: any) {
    this.fomatHelper.setFilter(
      this.filter.scale,
      e.target.value,
      e.target.checked
    );
    this.onChooseFilter.emit(this.filter);
  }
  changeSort(e: any) {
    if (e.target.checked) {
      this.filter.sort = [e.target.value];
    } else {
      this.filter.sort = [];
    }
    this.onChooseFilter.emit(this.filter);
  }
  toggleSortDropBox() {
    if (window.innerWidth < 992) {
      this.toggleSort = !this.toggleSort;
      if (this.toggleSort) {
        document.getElementById('sortItem')?.classList.add('filterItem_active');
        this.sortHeader = 'text-red-600';
        this.toggleClassify = true;
        this.toggleClassifyDropBox();
      } else {
        document
          .getElementById('sortItem')
          ?.classList.remove('filterItem_active');
        this.sortHeader = '';
      }
    }
  }
  toggleClassifyDropBox() {
    if (window.innerWidth < 992) {
      this.toggleClassify = !this.toggleClassify;
      if (this.toggleClassify) {
        document
          .getElementById('classifyItem')
          ?.classList.add('filterItem_active');
        this.classifyHeader = 'text-red-600';
        this.toggleSort = true;
        this.toggleSortDropBox();
      } else {
        document
          .getElementById('classifyItem')
          ?.classList.remove('filterItem_active');
        this.classifyHeader = '';
      }
    }
  }
}
