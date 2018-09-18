import { MasterService } from './master.service';
import { ValueService } from './value.service';

describe('services > with-dependencies', () => {

  let masterService: MasterService;

  it('real value from the real service', () => {

    let valueService = new ValueService();
    valueService.setValue('value');
    masterService = new MasterService(valueService);

    expect(masterService.getValue()).toBe('value');

  });

  it('fake value from a fakeService', () => {

    class FakeValueService extends ValueService {
      getValue() {
        return 'fake value';
      }
    }
    let fakeValueService = new FakeValueService();
    masterService = new MasterService(fakeValueService);

    expect(masterService.getValue()).toBe('fake value');

  });

  it('fake value from a fake object', () => {

    const fake = {
      getValue: () => 'fake value'
    };
    masterService = new MasterService(fake as ValueService);

    expect(masterService.getValue()).toBe('fake value');

  });

  it('stubbed value from a spy', () => {

    const valueServiceSpy = jasmine.createSpyObj('ValueService',['getValue']);
    const stubValue = 'stub value';
    valueServiceSpy.getValue.and.returnValue(stubValue);
    masterService = new MasterService(valueServiceSpy);

    expect(masterService.getValue())
      .toBe(stubValue, 'service returned stub value');
    expect(valueServiceSpy.getValue.calls.count())
      .toBe(1, 'spy method was called once');
    expect(valueServiceSpy.getValue.calls
      .mostRecent().returnValue).toBe(stubValue);

  });

});
