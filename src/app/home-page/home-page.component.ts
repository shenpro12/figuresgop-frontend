import { Component, AfterViewInit, OnInit } from '@angular/core';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements AfterViewInit, OnInit {
  productTabOption = [
    {
      imageUrl:
        'https://res.cloudinary.com/drdnqwdzd/image/upload/v1676940886/home_collection_1_banner_m4yzeq.webp',
      query: 'order',
      imagePosition: 'left',
      title: 'Sản phẩm Order',
      subText: 'Những sản phẩm đã hoặc sắp phát hành & cần đặt trước',
    },
    {
      imageUrl:
        'https://res.cloudinary.com/drdnqwdzd/image/upload/v1676940886/home_collection_2_banner_urvbek.webp',
      query: 'available',
      imagePosition: 'right',
      title: 'Sản phẩm có sẵn',
      subText: 'Sản phẩm đang có sẵn, bạn có thể mua ngay',
    },
    {
      imageUrl:
        'https://res.cloudinary.com/drdnqwdzd/image/upload/v1676940884/970cc9b67041ac0640ae310962014712_tkv0oq.jpg',
      query: 'scale-figure',
      imagePosition: 'left',
      title: 'Scale Figure',
      subText: 'Những figure được chế tác theo tỉ lệ chuẩn',
    },
  ];
  constructor() {}
  ngOnInit(): void {
    document.title = 'Trang chủ';
  }
  ngAfterViewInit(): void {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
}
