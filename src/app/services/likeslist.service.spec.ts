import { TestBed } from '@angular/core/testing';

import { LikeslistService } from './likeslist.service';

describe('LikeslistService', () => {
  let service: LikeslistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LikeslistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
