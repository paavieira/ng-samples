import { AsyncValueService } from './async-value.service';

describe('services > async', () => {

  let service: AsyncValueService;

  beforeEach(() => {
    service = new AsyncValueService();
  });

  it('value from observable', (done: DoneFn) => {

    service.getObservableValue().subscribe(value => {
      expect(value).toBe('value');
      done();
    });

    service.next('value');

  });

  it('value from a promise', (done: DoneFn) => {

    service.getPromiseValue().then(value => {
      expect(value).toBe('value');
      done();
    });

    service.next('value');

  });

});
