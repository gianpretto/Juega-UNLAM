import { TestBed } from '@angular/core/testing';

import { PlataformaService } from './plataforma.service';

describe('PlataformaService', () => {
  let service: PlataformaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlataformaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
