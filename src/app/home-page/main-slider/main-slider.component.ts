import { Component, ViewEncapsulation } from '@angular/core';
import SwiperCore, {
  Pagination,
  SwiperOptions,
  Autoplay,
  Navigation,
} from 'swiper';
SwiperCore.use([Pagination, Autoplay, Navigation]);
@Component({
  selector: 'app-main-slider',
  templateUrl: './main-slider.component.html',
  styleUrls: ['./main-slider.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class MainSliderComponent {
  config: SwiperOptions = {
    loop: true,
    grabCursor: true,
    navigation: true,
    pagination: { clickable: true },
    autoplay: { delay: 5000, disableOnInteraction: false },
  };
  sliderImg = [
    {
      tl: 'https://res.cloudinary.com/drdnqwdzd/image/upload/v1676940888/slide_1_img_jw3l0w.webp',
      mb: 'https://res.cloudinary.com/drdnqwdzd/image/upload/v1676940887/slide_1_mb_xmwlwe.webp',
      url: '/pages/about-us',
    },
    {
      tl: 'https://res.cloudinary.com/drdnqwdzd/image/upload/v1676940887/slide_2_img_l9o2r2.webp',
      mb: 'https://res.cloudinary.com/drdnqwdzd/image/upload/v1676940887/slide_2_mb_smbbko.webp',
      url: '/blogs/guide',
    },
    {
      tl: 'https://res.cloudinary.com/drdnqwdzd/image/upload/v1676940888/slide_3_img_cscoao.webp',
      mb: 'https://res.cloudinary.com/drdnqwdzd/image/upload/v1676940888/slide_3_mb_ihiobo.webp',
      url: '/',
    },
    {
      tl: 'https://res.cloudinary.com/drdnqwdzd/image/upload/v1676940888/slide_4_img_sxab2m.webp',
      mb: 'https://res.cloudinary.com/drdnqwdzd/image/upload/v1676940888/slide_4_mb_jtym3k.webp',
      url: '/',
    },
  ];
}
