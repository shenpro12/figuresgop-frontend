import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Icon from '@fortawesome/free-solid-svg-icons';
import { select, Store } from '@ngrx/store';
import { AccountService } from 'src/app/services/account.service';
import { SiteLoadingShareService } from 'src/app/services/communicateWithSiteLoading.service';
import { selectLoginInfo } from 'src/app/store/selectors/account.selector';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.css'],
})
export class ResetPasswordPageComponent implements OnInit {
  icon = Icon;
  userName: string = '';
  status: string = '';
  constructor(
    private accountService: AccountService,
    private siteLoadingShareService: SiteLoadingShareService,
    private store: Store<any>,
    private router: Router
  ) {}
  ngOnInit(): void {
    document.title = 'Quên mật khẩu';
    this.store.pipe(select(selectLoginInfo)).subscribe((res) => {
      if (res.status) {
        this.router.navigate(['/']);
      }
    });
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
  resetHandle() {
    this.status = '';
    if (this.userName) {
      this.siteLoadingShareService.changeDisplay(true);
      this.accountService.resetPassword(this.userName).subscribe((res) => {
        this.siteLoadingShareService.changeDisplay(false);
        this.status = res.message;
      });
    } else {
      this.status = 'Vui lòng nhập đầy đủ thông tin!';
    }
  }
}
