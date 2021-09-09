import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileLocationpopoverScreenComponent } from './mobile-locationpopover-screen.component';

describe('MobileLocationpopoverScreenComponent', () => {
  let component: MobileLocationpopoverScreenComponent;
  let fixture: ComponentFixture<MobileLocationpopoverScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileLocationpopoverScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileLocationpopoverScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
