import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSliderItemComponent } from './product-slider-item.component';

describe('ProductSliderItemComponent', () => {
  let component: ProductSliderItemComponent;
  let fixture: ComponentFixture<ProductSliderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSliderItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSliderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
