import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherProfileSkeletonComponent } from './other-profile-skeleton.component';

describe('OtherProfileSkeletonComponent', () => {
  let component: OtherProfileSkeletonComponent;
  let fixture: ComponentFixture<OtherProfileSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherProfileSkeletonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherProfileSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
