import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMedthosComponent } from './payment-medthos.component';

describe('PaymentMedthosComponent', () => {
  let component: PaymentMedthosComponent;
  let fixture: ComponentFixture<PaymentMedthosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentMedthosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentMedthosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
