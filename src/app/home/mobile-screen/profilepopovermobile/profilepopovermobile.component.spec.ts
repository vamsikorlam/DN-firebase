import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilepopovermobileComponent } from './profilepopovermobile.component';

describe('ProfilepopovermobileComponent', () => {
  let component: ProfilepopovermobileComponent;
  let fixture: ComponentFixture<ProfilepopovermobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilepopovermobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilepopovermobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
