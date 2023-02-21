import { Component } from '@angular/core';
import {
  faShareFromSquare,
  faCreditCard,
  faPlaneDeparture,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'slogan',
  templateUrl: './slogan.component.html',
  styleUrls: ['./slogan.component.css'],
})
export class SloganComponent {
  data = [
    {
      icon: faShareFromSquare,
      headerText: 'Sản phẩm chính hãng',
      textContent: 'Nhập khẩu trực tiếp từ Nhật Bản',
    },
    {
      icon: faCreditCard,
      headerText: 'Thanh toán đơn giản',
      textContent: 'Chuyển khoản hoặc COD',
    },
    {
      icon: faPlaneDeparture,
      headerText: 'Giao hàng nhanh chóng',
      textContent: 'Miễn phí với đơn hàng > 1 triệu',
    },
  ];
  faAngleRight = faAngleRight;
}
