import { TestBed } from '@angular/core/testing';

import { JuegoPlataformaService } from './juego-plataforma.service';

describe('JuegoPlataformaService', () => {
  let service: JuegoPlataformaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JuegoPlataformaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
