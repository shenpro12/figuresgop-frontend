import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AccountService } from '../services/account.service';
import { SiteLoadingShareService } from '../services/communicateWithSiteLoading.service';
import { logOut } from '../store/actions/login.action';
import { AppState } from '../store/appState';
import { selectLoginInfo } from '../store/selectors/account.selector';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  loginInfo: any;
  activateContent: string = 'profile';
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private siteLoadingShareService: SiteLoadingShareService,
    private accountService: AccountService
  ) {}
  ngOnInit(): void {
    this.store.pipe(select(selectLoginInfo)).subscribe((login) => {
      if (login.status) {
        this.loginInfo = login;
      } else {
        this.router.navigate(['account/login']);
      }
    });
  }
  logOut() {
    this.siteLoadingShareService.changeDisplay(true);
    this.accountService.logOut().subscribe((res) => {
      if (res.status || !res.status) {
        this.store.dispatch(logOut());
        this.router.navigate(['/']);
      }
      this.siteLoadingShareService.changeDisplay(false);
    });
  }
}
