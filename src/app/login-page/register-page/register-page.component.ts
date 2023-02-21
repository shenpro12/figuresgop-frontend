import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as Icon from '@fortawesome/free-solid-svg-icons';
import { selectLoginInfo } from 'src/app/store/selectors/account.selector';
import { SiteLoadingShareService } from 'src/app/services/communicateWithSiteLoading.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  icon = Icon;
  name: string = '';
  email: string = '';
  location: string = '';
  phone: string = '';
  password: string = '';
  status: string = '';
  constructor(
    private store: Store<any>,
    private router: Router,
    private siteLoadingShareService: SiteLoadingShareService,
    private accountService: AccountService
  ) {}
  ngOnInit(): void {
    document.title = 'Đăng ký tài khoản';
    this.store.pipe(select(selectLoginInfo)).subscribe((res) => {
      if (res.status) {
        this.router.navigate(['/']);
      }
    });
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
  registerHandle() {
    if (
      this.name &&
      this.email &&
      this.location &&
      this.phone &&
      this.password
    ) {
      this.siteLoadingShareService.changeDisplay(true);
      this.accountService
        .sigin(this.name, this.email, this.phone, this.location, this.password)
        .subscribe((res) => {
          this.siteLoadingShareService.changeDisplay(false);
          if (!res.status) {
            this.status = res.message;
          } else {
            this.status = res.message;
          }
        });
    } else {
      this.status = 'Vui lòng nhập đầy đủ thông tin!';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
}
