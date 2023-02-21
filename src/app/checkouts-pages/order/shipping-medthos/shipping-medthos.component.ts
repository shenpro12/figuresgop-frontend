import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'shipping-medthos',
  templateUrl: './shipping-medthos.component.html',
  styleUrls: ['./shipping-medthos.component.css'],
})
export class ShippingMedthosComponent implements OnChanges {
  @Input() province: string = '';
  @Input() district: string = '';
  @Input() ward: string = '';
  @Input() transportFee: number = 0;
  @Output() change = new EventEmitter();
  status: string = '';
  checked: string = 'DELIVERY';
  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (!this.province) {
      this.status =
        'Vui lòng chọn tỉnh / thành để có danh sách phương thức vận chuyển.';
    }
    if (this.province && !this.district) {
      this.status =
        'Vui lòng chọn quận / huyện để có danh sách phương thức vận chuyển.';
    }
    if (this.province && this.district && !this.ward) {
      this.status =
        'Vui lòng chọn phường / xã để có danh sách phương thức vận chuyển.';
    }
    // if (this.province && this.district && this.ward) {
    //   this.change.emit({
    //     method: this.checked,
    //     transportFee: this.checked == 'DIRECT' ? 0 : this.transportFee,
    //   });
    // }
  }
  selectMethod(method: string) {
    if (this.checked != method) {
      this.checked = method;
      this.change.emit({
        method: this.checked,
        transportFee: this.checked == 'DIRECT' ? 0 : this.transportFee,
      });
    }
  }
  checkBoxChange(e: any) {
    if (e.target.value == this.checked) {
      e.target.checked = true;
    }
  }
}
