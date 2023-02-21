import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Icon from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { AccountService } from 'src/app/services/account.service';
import { SiteLoadingShareService } from 'src/app/services/communicateWithSiteLoading.service';
import { logOut, updateProfile } from 'src/app/store/actions/login.action';
import { AppState } from 'src/app/store/appState';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnChanges {
  @Input() profile: any;
  icon = Icon;
  //
  name: string = '';
  phone: string = '';
  location: string = '';
  status: string = '';
  constructor(
    private store: Store<AppState>,
    private siteLoadingShareService: SiteLoadingShareService,
    private accountService: AccountService
  ) {}
  ngOnChanges(simpleChanges: SimpleChanges): void {
    let changesData = simpleChanges['profile'].currentValue;
    this.name = changesData.name;
    this.phone = changesData.phone;
    this.location = changesData.location;
    document.title = `Thông tin tài khoản | ${
      this.profile.name ? this.profile.name : this.profile.userName
    }`;
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
  updateProfile() {
    if (this.name && this.phone && this.location) {
      this.siteLoadingShareService.changeDisplay(true);
      this.accountService
        .updateProfile({
          name: this.name,
          phone: this.phone,
          location: this.location,
        })
        .subscribe((res) => {
          this.siteLoadingShareService.changeDisplay(false);
          if (res.status) {
            this.store.dispatch(
              updateProfile({
                profile: {
                  name: this.name,
                  phone: this.phone,
                  location: this.location,
                },
              })
            );
            this.status = res.message;
          } else if (!res.status && res.type == 'login') {
            this.store.dispatch(logOut());
          } else {
            this.status = res.message;
          }
        });
    } else {
      this.status = 'Vui lòng nhập đầy đủ thông tin!';
    }
  }
}
