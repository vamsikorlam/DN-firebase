import { TestBed } from '@angular/core/testing';

import { OtherProfileUserService } from './other-profile-user.service';

describe('OtherProfileUserService', () => {
  let service: OtherProfileUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtherProfileUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
