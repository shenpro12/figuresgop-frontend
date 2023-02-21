import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'payment-medthos',
  templateUrl: './payment-medthos.component.html',
  styleUrls: ['./payment-medthos.component.css'],
})
export class PaymentMedthosComponent implements OnInit {
  data: Array<any> = [
    {
      header: '1. Chuyển khoản đến Figure Shop',
      body: [
        'Chủ TK: Lê Văn Đạt',
        'Nội dung chuyển khoản: Mã Đơn Hàng của bạn.',
        ' Vd: Cọc 50 phan tram 012345, Thanh toán 100 phan tram 012345',
        '1. Techcombank Số TK: 37 38 48 58 68 Chi nhánh: Kỳ Hòa',
        '2. VIB Số TK: 005181007 Chi nhánh VIB Gia Định',
        '3. Vietcombank Số TK: 0421000442816 Chi nhánh Phú Thọ',
        '4. ACB Số TK: 143091319 Chi nhánh: Phòng giao dịch Vạn Hạnh',
        '5. VPbank Số TK: 655580999 Chi nhánh Phòng giao dịch Quận 10',
      ],
      value: 'ATM',
    },
    {
      header: '2. Chuyển tiền đến ví điện tử',
      body: [
        'Momo / Zalo Pay / Viettel Money',
        'SĐT: 0908268007',
        'Người nhận: Lê Văn Đạt',
        'Nội dung chuyển khoản: Mã Đơn Hàng của bạn.',
        'Vd: Cọc 50 phan tram 012345, Thanh toán 100 phan tram 012345',
      ],
      value: 'WALLET',
    },
    {
      header: '3. Đến trực tiếp Japan Figure để cọc / thanh toán',
      body: [
        'Vui lòng hẹn trước khi đến 0908268007 A.Tân Địa chỉ: 384/97A Lý Thái Tổ, P.10, Q.10, HCM',
      ],
      value: 'DIRECT',
    },
    {
      header: '4. COD - Chỉ áp dụng với sản phẩm có sẵn',
      body: [
        'Đặc biệt lưu ý: Hãy chắc chắn bạn đã liên hệ với admin để xác định sản phẩm này có sẵn hay cần đặt trước. Thời gian ship từ 1-4 ngày tuỳ vào địa chỉ của bạn, bạn có thể thanh toán 100% cho shipper. Shipper sẽ gọi điện cho bạn trước khi đến. Đơn hàng sẽ tự động huỷ nếu bạn lựa chọn COD cho sản phẩm cần đặt trước.',
      ],
      value: 'COD',
    },
  ];
  @Output() onChange = new EventEmitter();
  checked: string = 'ATM';
  ngOnInit(): void {
    this.onChange.emit(this.checked);
  }
  onClick(e: any) {
    this.checked = e;
    this.onChange.emit(this.checked);
  }
  onInputChange(e: any) {
    if (e.target.value == this.checked) {
      e.target.checked = true;
    }
  }
}
