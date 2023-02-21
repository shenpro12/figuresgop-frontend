import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BlogService } from '../services/blog.service';
import * as Icon from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import * as sanitizeHtml from 'sanitize-html';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class PagesComponent implements OnInit {
  post: any = '';
  title: string = '';
  description: string = '';
  icon = Icon;
  loading: boolean = true;
  constructor(
    private blogService: BlogService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe((params: ParamMap) => {
      this.loading = true;
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      this.blogService.getPageContent(params.get('slug')).subscribe((res) => {
        if (res.status) {
          this.post = sanitizeHtml(res.html, {
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
          this.description = res.description;
          document.title = this.title;
        } else if (!res.status) {
          this.router.navigate(['not-found']);
        }
        this.loading = false;
      });
    });
  }
  navigate(url: string) {
    this.router.navigate([url]);
  }
}
