import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessSearchComponent } from './business-search.component';

describe('BusinessSearchComponent', () => {
  let component: BusinessSearchComponent;
  let fixture: ComponentFixture<BusinessSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
