import { Component, OnInit } from '@angular/core';
import { SiteLoadingShareService } from '../services/communicateWithSiteLoading.service';

@Component({
  selector: 'app-site-loading',
  templateUrl: './site-loading.component.html',
  styleUrls: ['./site-loading.component.css'],
})
export class SiteLoadingComponent implements OnInit {
  loading: boolean = false;
  constructor(private siteLoadingShareService: SiteLoadingShareService) {}
  ngOnInit(): void {
    this.siteLoadingShareService.currentDisplay.subscribe((res) => {
      this.loading = res;
      if (this.loading) {
        document.getElementsByTagName('body')[0].style.overflow = 'hidden';
      } else {
        document.getElementsByTagName('body')[0].style.overflow = 'auto';
      }
    });
  }
}
