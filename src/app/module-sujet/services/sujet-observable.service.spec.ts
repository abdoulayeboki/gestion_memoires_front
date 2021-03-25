import { TestBed } from '@angular/core/testing';

import { SujetObservableService } from './sujet-observable.service';

describe('SujetObservableService', () => {
  let service: SujetObservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SujetObservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
