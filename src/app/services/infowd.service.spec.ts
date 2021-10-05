import { TestBed } from '@angular/core/testing';

import { InfowdService } from './infowd.service';

describe('InfowdService', () => {
  let service: InfowdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfowdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
