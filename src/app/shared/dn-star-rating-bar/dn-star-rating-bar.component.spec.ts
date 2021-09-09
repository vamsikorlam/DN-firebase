import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DnStarRatingBarComponent } from './dn-star-rating-bar.component';

describe('StarRatingBarComponent', () => {
  let component: DnStarRatingBarComponent;
  let fixture: ComponentFixture<DnStarRatingBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DnStarRatingBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DnStarRatingBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
