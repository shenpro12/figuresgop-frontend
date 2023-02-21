import { Component, ElementRef, OnInit } from '@angular/core';
import * as Icon from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'popup-contact',
  templateUrl: './popup-contact.component.html',
  styleUrls: ['./popup-contact.component.css'],
})
export class PopupContactComponent implements OnInit {
  icon = Icon;
  show: boolean = false;
  constructor(private self: ElementRef<HTMLElement>) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.show = true;
    }, 300000);
  }
  closePopup() {
    this.self.nativeElement.remove();
  }
}
