import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderProfilePopoverComponent } from './header-profile-popover.component';

describe('HeaderProfilePopoverComponent', () => {
  let component: HeaderProfilePopoverComponent;
  let fixture: ComponentFixture<HeaderProfilePopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderProfilePopoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderProfilePopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
