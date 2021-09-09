import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityMemebersComponent } from './community-memebers.component';

describe('CommunityMemebersComponent', () => {
  let component: CommunityMemebersComponent;
  let fixture: ComponentFixture<CommunityMemebersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityMemebersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityMemebersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
