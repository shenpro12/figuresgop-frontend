import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockProblemsComponent } from './stock-problems.component';

describe('StockProblemsComponent', () => {
  let component: StockProblemsComponent;
  let fixture: ComponentFixture<StockProblemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockProblemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockProblemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
