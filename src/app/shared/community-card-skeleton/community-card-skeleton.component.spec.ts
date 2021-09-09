import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityCardSkeletonComponent } from './community-card-skeleton.component';

describe('CommunityCardSkeletonComponent', () => {
  let component: CommunityCardSkeletonComponent;
  let fixture: ComponentFixture<CommunityCardSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityCardSkeletonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityCardSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
