import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faAngleDown, faClose } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { AccountService } from 'src/app/services/account.service';
import { select, Store } from '@ngrx/store';
import { login, logOut } from 'src/app/store/actions/login.action';
import { selectLoginInfo } from 'src/app/store/selectors/account.selector';
import { LoginState } from 'src/app/store/reducer/login.reducer';
import { CookieService } from 'ngx-cookie-service';
import { SiteLoadingShareService } from 'src/app/services/communicateWithSiteLoading.service';
@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css'],
})
export class LoginButtonComponent implements OnInit {
  faUser = faUser;
  faClose = faClose;
  faAngleDown = faAngleDown;
  userName: string = '';
  password: string = '';
  toggleLoginForm: boolean = false;
  loginInfo: LoginState = { status: true, userProfile: '' };
  status: string = '';
  constructor(
    private router: Router,
    private accountService: AccountService,
    private store: Store<any>,
    private siteLoadingShareService: SiteLoadingShareService
  ) {}
  ngOnInit(): void {
    this.store.pipe(select(selectLoginInfo)).subscribe((res) => {
      this.loginInfo = res;
    });
  }
  activeInput(e: any) {
    e.target.previousSibling.classList.add('label_inputActive');
  }
  eliminateInput(e: any) {
    if (e.target.previousSibling.innerText == 'Email' && !this.userName) {
      e.target.previousSibling.classList.remove('label_inputActive');
    }
    if (e.target.previousSibling.innerText == 'Mật khẩu' && !this.password) {
      e.target.previousSibling.classList.remove('label_inputActive');
    }
  }
  toggleLoginFormHandle() {
    this.status = '';
    if (!this.router.url.includes('account')) {
      this.userName = '';
      this.password = '';
      this.toggleLoginForm = !this.toggleLoginForm;
      if (this.toggleLoginForm && window.innerWidth < 990) {
        document.getElementsByTagName('body')[0].style.overflow = 'hidden';
      } else {
        document.getElementsByTagName('body')[0].style.overflow = 'auto';
      }
    }
  }
  login() {
    if (this.userName && this.password) {
      this.siteLoadingShareService.changeDisplay(true);
      this.accountService
        .login(this.userName, this.password)
        .subscribe((res) => {
          if (res.status) {
            this.store.dispatch(
              login({ status: res.status, userProfile: res.userProfile })
            );
            this.toggleLoginFormHandle();
          } else {
            this.status = res.message;
            this.userName = '';
            this.password = '';
          }
          this.siteLoadingShareService.changeDisplay(false);
        });
    } else {
      this.status = 'Vui lòng nhập đầy đủ thông tin!';
    }
  }
  logOut() {
    this.siteLoadingShareService.changeDisplay(true);
    this.accountService.logOut().subscribe((res) => {
      if (res.status || !res.status) {
        this.store.dispatch(logOut());
        this.toggleLoginFormHandle();
      }
      this.siteLoadingShareService.changeDisplay(false);
    });
  }
}
