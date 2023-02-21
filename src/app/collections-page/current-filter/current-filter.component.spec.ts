import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentFilterComponent } from './current-filter.component';

describe('CurrentFilterComponent', () => {
  let component: CurrentFilterComponent;
  let fixture: ComponentFixture<CurrentFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
