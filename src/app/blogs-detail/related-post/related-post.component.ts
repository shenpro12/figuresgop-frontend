import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import SwiperCore, { SwiperOptions, Navigation, Autoplay } from 'swiper';
import { AppState } from 'src/app/store/appState';
import { selectBlogs } from 'src/app/store/selectors/blog.selector';
SwiperCore.use([Navigation, Autoplay]);
@Component({
  selector: 'related-post',
  templateUrl: './related-post.component.html',
  styleUrls: ['./related-post.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class RelatedPostComponent implements OnInit, OnChanges {
  @Input() blogType: string = '';
  @Input() currentPost: string = '';
  blogsData: Array<any> = [];
  renderData: any;

  config: SwiperOptions = {
    navigation: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    spaceBetween: 10,
    slidesPerView: 2,
    breakpoints: {
      '1170': {
        slidesPerView: 3,
        spaceBetween: 50,
      },
    },
  };
  constructor(private store: Store<AppState>) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.blogsData.length && changes['currentPost']) {
      this.setupData(changes['currentPost'].currentValue);
    }
  }
  ngOnInit(): void {
    this.store.pipe(select(selectBlogs)).subscribe((res) => {
      this.blogsData = res.filter((i) => i.type == this.blogType);
      this.setupData(this.currentPost);
    });
  }
  setupData(Id: any) {
    this.renderData = this.blogsData.slice(0, 6).filter((j) => j.ID != Id);
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
