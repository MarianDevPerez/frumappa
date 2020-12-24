import { TestBed } from '@angular/core/testing';

import { EspeciesService } from './especies.service';

describe('EspeciesService', () => {
  let service: EspeciesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EspeciesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
