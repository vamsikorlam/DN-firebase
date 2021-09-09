import { TestBed } from '@angular/core/testing';

import { HeaderFooterSharedService } from './header-footer-shared.service';

describe('HeaderFooterSharedService', () => {
  let service: HeaderFooterSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderFooterSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
