import { TestBed } from '@angular/core/testing';
import { ValueService } from './value.service';

describe('services > test-bed > simple', () => {

  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValueService]
    });
    service = TestBed.get(ValueService);
  });

  it('real value', () => {
    service.setValue('value');
    expect(service.getValue()).toBe('value');
  });

});
