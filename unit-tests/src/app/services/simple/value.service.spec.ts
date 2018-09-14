import { ValueService } from './value.service';

describe('ValueService', () => {

  let service: ValueService;

  beforeEach(() => {
    service = new ValueService();
  });

  it('real value', () => {
    service.setValue('value');
    expect(service.getValue()).toBe('value');
  });

});
