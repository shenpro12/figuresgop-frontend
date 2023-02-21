import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsPagesComponent } from './blogs-pages.component';

describe('BlogsPagesComponent', () => {
  let component: BlogsPagesComponent;
  let fixture: ComponentFixture<BlogsPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogsPagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogsPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
