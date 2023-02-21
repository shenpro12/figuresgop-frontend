import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteLoadingComponent } from './site-loading.component';

describe('SiteLoadingComponent', () => {
  let component: SiteLoadingComponent;
  let fixture: ComponentFixture<SiteLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteLoadingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
