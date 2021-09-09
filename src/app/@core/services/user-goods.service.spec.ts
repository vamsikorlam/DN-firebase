import { TestBed } from '@angular/core/testing';

import { UserGoodsService } from './user-goods.service';

describe('UserGoodsService', () => {
  let service: UserGoodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserGoodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
