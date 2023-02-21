import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SiteLoadingShareService {
  private display = new BehaviorSubject(false);
  currentDisplay = this.display.asObservable();

  constructor() {}

  changeDisplay(display: boolean) {
    this.display.next(display);
  }
}
