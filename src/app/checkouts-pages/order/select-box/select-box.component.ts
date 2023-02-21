import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import Provinces from 'src/app/helper/provinces';

@Component({
  selector: 'select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.css'],
})
export class SelectBoxComponent implements OnInit {
  provincesData: any;
  districtsData: any;
  wardsData: any;
  province: string | undefined = '';
  district: string | undefined = '';
  ward: string | undefined = '';
  price: number = 0;
  @Output() change = new EventEmitter();

  constructor(private provinces: Provinces) {}
  ngOnInit(): void {
    this.provincesData = this.provinces.getProvinces();
  }
  changeLabel(e: any, callback: any) {
    if (e.target.value) {
      callback(e.target.value);
      e.target.previousSibling.classList.add('itemSelect');
    } else {
      e.target.previousSibling.classList.remove('itemSelect');
    }
  }
  emit() {
    this.change.emit({
      province: this.province,
      district: this.district,
      ward: this.ward,
      price: this.price,
    });
  }
  provincesChange(e: any) {
    this.changeLabel(e, (value: any) => {
      if (value > 50) {
        this.price = 40000;
      } else {
        this.price = 60000;
      }
      this.wardsData = [];
      this.districtsData = [];
      this.districtsData = this.provinces.getDistrictsByProvince(value);
      this.province = this.provincesData.find((i: any) => i.id == value).name;
      this.district = '';
      this.ward = '';
      this.emit();
    });
  }
  districtsChange(e: any) {
    this.changeLabel(e, (value: any) => {
      this.wardsData = [];
      this.wardsData = this.provinces.getWardsByDistrict(value);
      this.district = this.districtsData.find((i: any) => i.id == value).name;
      this.ward = '';
      this.emit();
    });
  }
  wardsChange(e: any) {
    this.changeLabel(e, (value: any) => {
      this.ward = this.wardsData.find((i: any) => i.id == value).name;
      this.emit();
    });
  }
}
