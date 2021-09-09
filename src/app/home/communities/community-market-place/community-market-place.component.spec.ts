import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityMarketPlaceComponent } from './community-market-place.component';

describe('CommunityMarketPlaceComponent', () => {
  let component: CommunityMarketPlaceComponent;
  let fixture: ComponentFixture<CommunityMarketPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityMarketPlaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityMarketPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
