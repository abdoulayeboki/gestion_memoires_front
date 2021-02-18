import { TestBed } from '@angular/core/testing';

import { EnseignentService } from './enseignent.service';

describe('EnseignentService', () => {
  let service: EnseignentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnseignentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
