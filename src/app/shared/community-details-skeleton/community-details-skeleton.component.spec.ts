import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityDetailsSkeletonComponent } from './community-details-skeleton.component';

describe('CommunityDetailsSkeletonComponent', () => {
  let component: CommunityDetailsSkeletonComponent;
  let fixture: ComponentFixture<CommunityDetailsSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityDetailsSkeletonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityDetailsSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
