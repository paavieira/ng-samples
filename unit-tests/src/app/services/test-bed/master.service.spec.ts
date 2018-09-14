import { TestBed } from '@angular/core/testing';
import { MasterService } from '../with-dependencies/master.service';
import { ValueService } from '../simple/value.service';

describe('MasterService', () => {

  let masterService: MasterService;
  let valueServiceSpy: jasmine.SpyObj<ValueService>;

  beforeEach(() => {

    const spy = jasmine.createSpyObj('ValueService',
      ['getValue']
    );

    TestBed.configureTestingModule({
      providers: [
        MasterService,
        { provide: ValueService, useValue: spy }
      ]
    });

    masterService = TestBed.get(MasterService);
    valueServiceSpy = TestBed.get(ValueService);

  });

  it('stubbed value from a spy', () => {

    const stubValue = 'stub value';
    valueServiceSpy.getValue.and.returnValue(stubValue);

    expect(masterService.getValue()).toBe(stubValue);

  });

});
