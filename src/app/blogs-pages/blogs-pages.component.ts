import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store/appState';
import { selectBlogs } from '../store/selectors/blog.selector';

@Component({
  selector: 'app-blogs-pages',
  templateUrl: './blogs-pages.component.html',
  styleUrls: ['./blogs-pages.component.css'],
})
export class BlogsPagesComponent implements OnInit {
  blogsData: Array<any> = [];
  blogType: string | null = '';
  renderData: Array<any> = [];
  currentPage: { number: number } = { number: 1 };
  totalItemPerView: number = 8;
  constructor(
    private store: Store<AppState>,
    private router: ActivatedRoute,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.router.paramMap.subscribe((params: ParamMap) => {
      this.currentPage = { number: 1 };
      this.blogType = params.get('type');
      document.title =
        this.blogType == 'news'
          ? 'Blogs | Tin tức'
          : this.blogType == 'guide'
          ? 'Blogs | Hướng dẫn'
          : this.blogType == 'sale'
          ? 'Blogs | Ưu đãi'
          : '';
      let producttListener: any;
      producttListener = this.store
        .pipe(select(selectBlogs))
        .subscribe((res) => {
          this.blogsData = res.filter((i) => i.type == this.blogType);
          this.initData();
          producttListener?.unsubscribe();
        });
    });
  }
  initData() {
    if (this.blogsData.length) {
      let end = this.currentPage.number * this.totalItemPerView - 1;
      let start = end - (this.totalItemPerView - 1);
      this.renderData = this.blogsData.slice(start, end + 1);
      //
      if (!this.renderData.length) {
        this.route.navigate(['not-found']);
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } else {
      this.route.navigate(['not-found']);
    }
  }
  navigate(url: string) {
    this.route.navigate([url]);
  }
  getTime(time: string) {
    let date = new Date(parseFloat(time));
    return `${date.getDate()} Tháng ${date.getMonth()}, ${date.getFullYear()}`;
  }
  changePageNumber(e: number) {
    this.currentPage = { number: e };
    this.initData();
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
