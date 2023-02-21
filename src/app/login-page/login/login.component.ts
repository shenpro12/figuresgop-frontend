import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Icon from '@fortawesome/free-solid-svg-icons';
import { select, Store } from '@ngrx/store';
import { AccountService } from 'src/app/services/account.service';
import { SiteLoadingShareService } from 'src/app/services/communicateWithSiteLoading.service';
import { login } from 'src/app/store/actions/login.action';
import { selectLoginInfo } from 'src/app/store/selectors/account.selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  icon = Icon;
  password: string = '';
  userName: string = '';
  status: string = '';
  constructor(
    private store: Store<any>,
    private router: Router,
    private siteLoadingShareService: SiteLoadingShareService,
    private accountService: AccountService
  ) {}
  ngOnInit(): void {
    document.title = 'Đăng nhập';
    this.store.pipe(select(selectLoginInfo)).subscribe((res) => {
      if (res.status) {
        this.router.navigate(['/']);
      }
    });
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
  loginHandle() {
    if (this.userName && this.password) {
      this.siteLoadingShareService.changeDisplay(true);
      this.accountService
        .login(this.userName, this.password)
        .subscribe((res) => {
          if (res.status) {
            this.store.dispatch(
              login({ status: res.status, userProfile: res.userProfile })
            );
            this.router.navigate(['/']);
          } else {
            this.status = res.message;
            this.password = '';
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          }
          this.siteLoadingShareService.changeDisplay(false);
        });
    } else {
      this.status = 'Vui lòng nhập đầy đủ thông tin!';
    }
  }
}
