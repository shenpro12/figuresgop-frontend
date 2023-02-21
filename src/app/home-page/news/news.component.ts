import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { select, Store } from '@ngrx/store';
import SwiperCore, { SwiperOptions, Navigation, Autoplay } from 'swiper';
import { AppState } from 'src/app/store/appState';
import { selectBlogs } from 'src/app/store/selectors/blog.selector';
SwiperCore.use([Navigation, Autoplay]);
@Component({
  selector: 'news-slider',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class NewsComponent implements OnInit {
  renderData: any;
  config: SwiperOptions = {
    navigation: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    spaceBetween: 10,
    slidesPerView: 2,
    breakpoints: {
      '768': {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      '1170': {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  };
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.store.pipe(select(selectBlogs)).subscribe((res) => {
      this.renderData = res.filter((i) => i.type == 'news').slice(0, 5);
    });
  }
  convertName(post: any) {
    return `${post.title
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .replace(/[^\w]/gi, '-')
      .replace(/-*-/g, '-')
      .toLowerCase()}.${post.ID}`;
  }
}
