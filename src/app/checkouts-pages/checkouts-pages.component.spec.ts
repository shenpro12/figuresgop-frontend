import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutsPagesComponent } from './checkouts-pages.component';

describe('CheckoutsPagesComponent', () => {
  let component: CheckoutsPagesComponent;
  let fixture: ComponentFixture<CheckoutsPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutsPagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutsPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
