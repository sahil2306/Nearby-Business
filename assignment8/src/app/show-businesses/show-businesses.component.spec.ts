import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBusinessesComponent } from './show-businesses.component';

describe('ShowBusinessesComponent', () => {
  let component: ShowBusinessesComponent;
  let fixture: ComponentFixture<ShowBusinessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowBusinessesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowBusinessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
