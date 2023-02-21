import {
  Component,
  Input,
  Output,
  OnChanges,
  OnInit,
  SimpleChanges,
  EventEmitter,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import { ProductHelper } from 'src/app/helper/product.helper';
import { Product } from 'src/app/models/product.model';
import { AppState } from 'src/app/store/appState';
import { selectProduct } from 'src/app/store/selectors/product.selector';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnChanges, OnInit {
  @Input() searchInput: string = '';
  @Output() onSelectItem = new EventEmitter();
  productList: Array<Product> = [];
  dataRender: Array<Product> = [];
  totalResult: number = 0;
  constructor(
    private store: Store<AppState>,
    private productHelper: ProductHelper,
    private sanitizer: DomSanitizer
  ) {}
  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (this.productList.length && simpleChanges['searchInput'].currentValue) {
      this.dataRender = this.productHelper.getProductByKeyWord(
        this.searchInput,
        this.productList
      );
      this.totalResult = this.dataRender.length;
      this.dataRender = this.dataRender.slice(0, 4);
    } else {
      this.dataRender = [];
    }
  }
  ngOnInit(): void {
    this.store.pipe(select(selectProduct)).subscribe((products) => {
      this.productList = products;
    });
  }
  convertToSafeSrc(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  getURL(name: string, id: number) {
    return `/product/${name
      .replace(/[^\w]/gi, '-')
      .replace(/-*-/g, '-')
      .toLowerCase()}.${id}`;
  }
  clearResult() {
    this.dataRender = [];
    this.totalResult = 0;
    this.onSelectItem.emit();
  }
}
