import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSellPopoverComponent } from './header-sell-popover.component';

describe('HeaderSellPopoverComponent', () => {
  let component: HeaderSellPopoverComponent;
  let fixture: ComponentFixture<HeaderSellPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderSellPopoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderSellPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
