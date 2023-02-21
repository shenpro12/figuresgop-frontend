import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BlogService } from '../services/blog.service';
import * as sanitizeHtml from 'sanitize-html';

@Component({
  selector: 'app-blogs-detail',
  templateUrl: './blogs-detail.component.html',
  styleUrls: ['./blogs-detail.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class BlogsDetailComponent implements OnInit {
  blogContent: any;
  title: any;
  createdAt: any;
  blogType: any;
  loading: boolean = true;
  currentPost: string = '';
  constructor(
    private blogsService: BlogService,
    private router: ActivatedRoute,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.router.paramMap.subscribe((params: ParamMap) => {
      this.blogContent = '';
      this.loading = true;
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      let id: any = params.get('name')?.split('.');
      id = id[id.length - 1];
      this.currentPost = id;
      this.blogsService
        .getBlogContent(id, params.get('type'))
        .subscribe((res) => {
          if (res.status) {
            this.blogContent = sanitizeHtml(res.html, {
              allowedTags: [
                'address',
                'article',
                'aside',
                'footer',
                'header',
                'h1',
                'h2',
                'h3',
                'h4',
                'h5',
                'h6',
                'hgroup',
                'main',
                'nav',
                'section',
                'blockquote',
                'dd',
                'div',
                'dl',
                'dt',
                'figcaption',
                'figure',
                'hr',
                'li',
                'main',
                'ol',
                'p',
                'pre',
                'ul',
                'a',
                'abbr',
                'b',
                'bdi',
                'bdo',
                'br',
                'cite',
                'code',
                'data',
                'dfn',
                'em',
                'i',
                'kbd',
                'mark',
                'q',
                'rb',
                'rp',
                'rt',
                'rtc',
                'ruby',
                's',
                'samp',
                'small',
                'span',
                'strong',
                'sub',
                'sup',
                'time',
                'u',
                'var',
                'wbr',
                'caption',
                'col',
                'colgroup',
                'table',
                'tbody',
                'td',
                'tfoot',
                'th',
                'thead',
                'tr',
                'img',
              ],
              allowedSchemesByTag: {
                img: ['data'],
              },
            });
            this.title = res.title;
            this.createdAt = res.createdAt;
            this.blogType = res.type;
            document.title = this.title;
          } else {
            this.route.navigate(['not-found']);
          }
          this.loading = false;
        });
    });
  }
  navigate(url: string) {
    this.route.navigate([url]);
  }
  convertToDateString() {
    if (this.createdAt) {
      let date = new Date(parseFloat(this.createdAt));
      return `${date.getDate()} Tháng ${date.getMonth()}, ${date.getFullYear()}`;
    } else {
      return '';
    }
  }
}
