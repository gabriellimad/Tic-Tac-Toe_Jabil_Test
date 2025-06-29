import { TestBed } from '@angular/core/testing';
import { ResultsService } from './results.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Results', () => {
  let service: ResultsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // <-- aqui o módulo que fornece o HttpClient fake
      providers: [ResultsService]
    });
    service = TestBed.inject(ResultsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
