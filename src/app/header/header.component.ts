import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  faSearch,
  faShoppingCart,
  faBars,
  faPhone,
  faEnvelope,
  faClose,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  faClose = faClose;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faSearch = faSearch;
  faShoppingCart = faShoppingCart;
  faBars = faBars;
  headerItem = [
    { title: 'Trang chủ', slug: '/' },
    { title: 'Giới thiệu', slug: '/pages/about-us' },
    {
      title: 'Hướng dẫn',
      dropBoxItem: [
        { title: 'Figure là gì?', slug: '/pages/about-us' },
        { title: 'Các chủng loại figure', slug: '/pages/figure-type' },
        { title: 'Hỏi và đáp', slug: '/pages/q&a' },
        { title: 'Tất cả hướng dẫn', slug: '/blogs/guide' },
      ],
    },
    {
      title: 'Sản phẩm',
      dropBoxItem: [
        { title: 'Tất cả', slug: 'all' },
        { title: 'Hàng có sẵn', slug: 'available' },
        { title: 'hàng Order', slug: 'order' },
        { title: 'R18', slug: 'r18' },
        { title: 'Pop up parade', slug: 'pop-up-figure' },
        { title: 'Nendoroid', slug: 'chibi-figure' },
        { title: 'Scale figure', slug: 'scale-figure' },
        { title: 'Figma', slug: 'action-figure' },
        { title: 'Các loại figure khác', slug: 'other' },
      ],
    },
    { title: 'Tin tức', slug: 'blogs/news' },
    { title: 'Ưu đãi', slug: 'blogs/sale' },
  ];
  toggleHeaderItem: string = '';
  previousScrollY: number = 0;
  inputPlaceHolder: string = '';
  searchInput: string = '';
  constructor(private router: Router) {
    window.addEventListener('resize', () => {
      this.hideHeaderItem();
    });

    document.onscroll = () => {
      const searchContainer = document.getElementById('searchContainer');
      const headerContainer = document.getElementById('headerContainer');
      const logo = document.getElementById('logo');
      if (
        window.scrollY > 220 &&
        window.scrollY < this.previousScrollY &&
        this.previousScrollY - window.scrollY > 50
      ) {
        searchContainer?.classList.add('searchContainerScroll');
        headerContainer?.classList.remove('headerHide');
        headerContainer?.classList.add('headerScroll');
        headerContainer?.classList.add('headerContainerScroll');
        logo?.classList.add('logo_hidden');
        this.previousScrollY = window.scrollY;
      } else if (
        window.scrollY > 220 &&
        window.scrollY > this.previousScrollY &&
        window.scrollY - this.previousScrollY > 150
      ) {
        searchContainer?.classList.add('searchContainerScroll');
        if (headerContainer?.classList.contains('headerScroll')) {
          headerContainer?.classList.add('headerHide');
        }
        headerContainer?.classList.remove('headerScroll');
        headerContainer?.classList.add('headerContainerScroll');
        logo?.classList.add('logo_hidden');
        this.previousScrollY = window.scrollY;
      }
      if (window.scrollY <= 220) {
        searchContainer?.classList.remove('searchContainerScroll');
        headerContainer?.classList.remove('headerContainerScroll');
        headerContainer?.classList.remove('headerHide');
        headerContainer?.classList.remove('headerScroll');
        logo?.classList.remove('logo_hidden');
      }
    };
    this.placeholderHandle();
  }
  placeholderHandle() {
    let index: number = 0;
    let bool: boolean = true;
    let i: number = 0;
    let placeholderString = [
      [
        'T',
        'ì',
        'm',
        ' ',
        'k',
        'i',
        'ế',
        'm',
        ' ',
        's',
        'ả',
        'n',
        ' ',
        'p',
        'h',
        'ẩ',
        'm',
        '...',
        '?',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
      ],
      [
        'B',
        'ạ',
        'n',
        ' ',
        'c',
        'ầ',
        'n',
        ' ',
        't',
        'ì',
        'm',
        ' ',
        'g',
        'ì',
        '...',
        '?',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
      ],
      [
        'N',
        'h',
        'ậ',
        'p',
        ' ',
        't',
        'ê',
        'n',
        ' ',
        's',
        'ả',
        'n',
        ' ',
        'p',
        'h',
        'ẩ',
        'm',
        ' ',
        'c',
        'ầ',
        'n',
        ' ',
        't',
        'ì',
        'm',
        '...',
        '?',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
      ],
    ];
    let temp = placeholderString[i];
    const tick = setInterval(() => {
      if (bool && index <= temp.length - 1) {
        this.inputPlaceHolder += temp[index];
        index++;
      } else {
        bool = false;
      }
      if (!bool && index > 0) {
        this.inputPlaceHolder = this.inputPlaceHolder.slice(0, -1);
        index--;
      } else if (index === 0) {
        this.inputPlaceHolder = '';
        bool = true;
        if (i >= placeholderString.length - 1) {
          i = 0;
        } else {
          i++;
        }
        temp = placeholderString[i];
      }
    }, 60);
  }
  toggleHeaderItemHandle() {
    if (!this.toggleHeaderItem) {
      this.toggleHeaderItem = 'show';
      document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    } else {
      this.toggleHeaderItem = '';
      document.getElementsByTagName('body')[0].style.overflow = 'auto';
    }
  }
  clearSearchInput() {
    this.searchInput = '';
  }
  hideHeaderItem() {
    this.toggleHeaderItem = '';
    document.getElementsByTagName('body')[0].style.overflow = 'auto';
  }
  searchHandle() {
    if (this.searchInput) {
      this.router.navigate([`/search/${this.searchInput}`]);
      this.clearSearchInput();
    }
  }
}
