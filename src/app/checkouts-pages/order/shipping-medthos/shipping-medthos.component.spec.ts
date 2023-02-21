import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingMedthosComponent } from './shipping-medthos.component';

describe('ShippingMedthosComponent', () => {
  let component: ShippingMedthosComponent;
  let fixture: ComponentFixture<ShippingMedthosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingMedthosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingMedthosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
