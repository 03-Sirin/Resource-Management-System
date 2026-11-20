import { TestBed } from '@angular/core/testing';

import { ResourceRequestsServiceTs } from './resource-requests.service.js';

describe('ResourceRequestsServiceTs', () => {
  let service: ResourceRequestsServiceTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourceRequestsServiceTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
