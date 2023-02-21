import {
  Component,
  ViewEncapsulation,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import SwiperCore, {
  Thumbs,
  Pagination,
  Navigation,
  Mousewheel,
  Zoom,
} from 'swiper';
import * as Icon from '@fortawesome/free-solid-svg-icons';

SwiperCore.use([Thumbs, Pagination, Navigation, Mousewheel, Zoom]);
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class GalleryComponent implements OnChanges {
  @Input() productData: Product = new Product();
  dataRender: Array<string> | undefined;
  loading: boolean = true;
  thumbsSwiper: any;
  activeSlideIndex: number = 0;
  mySwiper: any;
  fullScreenSwiper: any;
  icon = Icon;
  toggleFullScreenSlider: boolean = false;
  fullScreenSlideTimer: any;
  constructor(
    private productService: ProductService,
    private sanitizer: DomSanitizer
  ) {}
  ngOnChanges(simplechanges: SimpleChanges): void {
    this.loading = true;
    this.dataRender = [
      simplechanges['productData'].currentValue.thumb_url,
      simplechanges['productData'].currentValue.subImg,
    ];
    this.productService
      .getProductImage(this.productData.ID)
      .subscribe((res: { data: Array<{ uri: string }>; productId: string }) => {
        if (this.productData.ID == Number.parseInt(res.productId)) {
          this.dataRender = [];
          this.dataRender = res.data.map((i: { uri: string }) => i.uri);
          this.loading = false;
        }
      });
  }
  initSwiper(e: any) {
    this.mySwiper = e[0];
  }
  slideTo(number: number) {
    if (this.mySwiper) {
      this.mySwiper.slideTo(number, 0, false);
    }
  }
  swiperChange(e: any) {
    this.activeSlideIndex = e[0].realIndex;
  }
  toggleFullScreenSliderHandle() {
    this.toggleFullScreenSlider = !this.toggleFullScreenSlider;
    let ele = document.getElementById('headerContainer');
    if (ele && this.toggleFullScreenSlider) {
      ele?.classList.remove('headerScroll');
      ele?.classList.add('headerHide');
    } else {
      ele?.classList.remove('headerHide');
    }
    if (!this.toggleFullScreenSlider) {
      this.slideTo(this.activeSlideIndex + 1);
      document.getElementsByTagName('body')[0].style.overflow = 'auto';
      if (this.fullScreenSlideTimer) {
        clearInterval(this.fullScreenSlideTimer);
        this.fullScreenSlideTimer = undefined;
      }
      return;
    }
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
  }
  fullScreenSwiperInit(e: any) {
    this.fullScreenSwiper = e[0];
  }
  zoomToItem() {
    this.fullScreenSwiper.zoom.toggle();
    this.fullScreenSwiper.autoplay.stop();
    if (this.fullScreenSlideTimer) {
      clearInterval(this.fullScreenSlideTimer);
      this.fullScreenSlideTimer = undefined;
    }
  }
  autoPlay() {
    if (this.fullScreenSlideTimer) {
      clearInterval(this.fullScreenSlideTimer);
      this.fullScreenSlideTimer = undefined;
    } else {
      this.fullScreenSlideTimer = setInterval(() => {
        this.fullScreenSwiper.slideNext(0);
      }, 3000);
    }
  }
  convertToSafeSrc(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
