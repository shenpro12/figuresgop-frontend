import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { faAngleDown, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header-item',
  templateUrl: './header-item.component.html',
  styleUrls: ['./header-item.component.css'],
})
export class HeaderItemComponent implements OnChanges {
  @Input() title: string = '';
  @Input() slug: string = '';
  @Input() dropBoxItem: any;
  @Output() onSelectItem = new EventEmitter();
  faAngleLeft = faAngleLeft;
  faAngleDown = faAngleDown;
  dropBox: boolean = false;
  toggleDropBox: string = 'dropBox_hidden dropBox_tablet_hidden';
  iconRotate: string = '';
  border: string = 'w-0 left-0';
  ngOnChanges() {
    if (this.dropBoxItem) {
      this.dropBox = true;
    }
  }

  showDropBox_mouseOver() {
    if (window.innerWidth >= 990) {
      this.border = 'w-full';
      this.iconRotate = 'rotate-180';
      this.toggleDropBox = 'dropBox_show dropBox_tablet_show';
    }
  }
  hideDropBox_mouseOut() {
    if (window.innerWidth >= 990) {
      this.border = 'w-0 right-0';
      this.iconRotate = '';
      this.toggleDropBox = 'dropBox_hidden dropBox_tablet_hidden';
    }
  }
  toggleDropBoxhandel() {
    if (window.innerWidth < 990) {
      if (this.toggleDropBox.includes('hidden')) {
        this.toggleDropBox = 'dropBox_show dropBox_tablet_show';
      } else {
        this.toggleDropBox = 'dropBox_hidden dropBox_tablet_hidden';
      }
    }
  }
  getLink(slug: string): string {
    let str = '';
    if (this.title == 'Sản phẩm' && slug) {
      str += `/collections/${slug}`;
    }
    if (this.title == 'Trang chủ' && slug) {
      str += `${slug}`;
    }
    if (
      (this.title == 'Giới thiệu' ||
        this.title == 'Hướng dẫn' ||
        this.title == 'Tin tức' ||
        this.title == 'Ưu đãi') &&
      slug
    ) {
      str += `${slug}`;
    }

    return str;
  }
  chooseItemHandler() {
    this.onSelectItem.emit();
  }
}
