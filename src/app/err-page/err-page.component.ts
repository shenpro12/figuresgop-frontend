import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-err-page',
  templateUrl: './err-page.component.html',
  styleUrls: ['./err-page.component.css'],
})
export class ErrPageComponent implements OnInit {
  ngOnInit(): void {
    document.title = 'Không tìm thấy trang';
  }
}
