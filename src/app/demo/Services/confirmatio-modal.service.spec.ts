import { TestBed } from '@angular/core/testing';

import { ConfirmatioModalService } from './confirmatio-modal.service';

describe('ConfirmatioModalService', () => {
  let service: ConfirmatioModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmatioModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
