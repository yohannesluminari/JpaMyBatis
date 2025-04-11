import { TestBed } from '@angular/core/testing';

import { ContrattoService } from './contratto.service';

describe('ContrattoService', () => {
  let service: ContrattoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContrattoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
