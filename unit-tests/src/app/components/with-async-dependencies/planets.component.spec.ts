import { ComponentFixture, TestBed, fakeAsync, tick, async } from '@angular/core/testing';

import { of, throwError } from 'rxjs';
import { last } from 'rxjs/operators';

import { PlanetService } from './planet.service';
import { PlanetsComponent } from './planets.component';

import { asyncData } from '../../helpers/async-data';

describe('components > with-async-dependencies', () => {

  let component: PlanetsComponent;
  let fixture: ComponentFixture<PlanetsComponent>;

  let planetService: jasmine.SpyObj<PlanetService>;
  let getRandomPlanetSpy: jasmine.Spy;

  let testPlanet = 'Alderaan';
  let planetEl: HTMLElement;

  let errorMessage = () => {
    // Get the error message from the template
    const errorEl = fixture.nativeElement.querySelector('.error');
    return errorEl && errorEl.textContent;
  };

  let syncSpy = () => {
    // Make the spy return a synchronous Observable with the test data
    return planetService.getRandomPlanet.and.returnValue(
      of(testPlanet)
    );
  };

  let asyncSpy = () => {
    // Simulate delayed observable values with the `asyncData()` helper
    return planetService.getRandomPlanet.and.returnValue(
      asyncData(testPlanet)
    );
  };

  let errorSpy = (errorMessage: string) => {
    // Tell spy to return an error observable
    return planetService.getRandomPlanet.and.returnValue(
      throwError(errorMessage)
    );
  };

  beforeEach(() => {

    planetService = jasmine.createSpyObj('PlanetService', ['getRandomPlanet']);

    TestBed.configureTestingModule({
      declarations: [PlanetsComponent],
      providers: [{ provide: PlanetService, useValue: planetService }]
    });

    fixture = TestBed.createComponent(PlanetsComponent);
    component = fixture.componentInstance;

    planetEl = fixture.nativeElement.querySelector('.planet');

  });

  // sync spy

  it('should show planet after component initialized', () => {

    getRandomPlanetSpy = syncSpy();
    fixture.detectChanges(); // onInit()

    // sync spy result shows testPlanet immediately after init
    expect(planetEl.textContent).toContain(testPlanet, 'should show planet');
    expect(getRandomPlanetSpy.calls.any()).toBe(true, 'getRandomPlanet called');
    expect(errorMessage()).toBeNull('should not show error');

  });

  // async spy

  it('should show planet after tick', fakeAsync(() => {

    getRandomPlanetSpy = asyncSpy();
    fixture.detectChanges(); // onInit()

    expect(planetEl.textContent).toBe('...', 'should show placeholder');

    tick(); // flush the observable to get the planet
    fixture.detectChanges(); // update view

    expect(planetEl.textContent).toContain(testPlanet, 'should show planet');
    expect(getRandomPlanetSpy.calls.any()).toBe(true, 'getRandomPlanet called');
    expect(errorMessage()).toBeNull('should not show error');

  }));

  it('should show planet after getRandomPlanet (async)', async(() => {

    getRandomPlanetSpy = asyncSpy();
    fixture.detectChanges(); // ngOnInit()

    expect(planetEl.textContent).toBe('...', 'should show placeholder');

    fixture.whenStable().then(() => { // wait for async getRandomPlanet

      fixture.detectChanges(); // update view with planet
      expect(planetEl.textContent).toBe(testPlanet);
      expect(getRandomPlanetSpy.calls.any()).toBe(true, 'getRandomPlanet called');
      expect(errorMessage()).toBeNull('should not show error');

    });

  }));

  // error

  it('should display error when PlanetService fails', fakeAsync(() => {

    getRandomPlanetSpy = errorSpy('PlanetService test failure');
    fixture.detectChanges(); // onInit()

    tick(); // flush the component's setTimeout()

    fixture.detectChanges(); // update error message within setTimeout()

    expect(errorMessage()).toContain('test failure', 'should display error');
    expect(planetEl.textContent).toBe('...', 'should show placeholder');

  }));

  it('should display error when PlanetService fails', async(() => {

    getRandomPlanetSpy = errorSpy('PlanetService test failure');
    fixture.detectChanges(); // onInit()

    fixture.whenStable().then(() => { // wait for async getRandomPlanet

      fixture.detectChanges(); // update error message within setTimeout()
      expect(errorMessage()).toContain('test failure', 'should display error');
      expect(planetEl.textContent).toBe('...', 'should show placeholder');

    });

  }));

  // done

  it('should show last planet (planet done)', (done: DoneFn) => {

    getRandomPlanetSpy = asyncSpy();
    fixture.detectChanges();

    component.planet.pipe( last() ).subscribe(() => {
      fixture.detectChanges(); // update view with planet
      expect(planetEl.textContent).toBe(testPlanet);
      expect(errorMessage()).toBeNull('should not show error');
      done();
    });

  });

  it('should show planet after getRandomPlanet (spy done)', (done: DoneFn) => {

    getRandomPlanetSpy = asyncSpy();
    fixture.detectChanges();

    // the spy's most recent call returns the observable with the test planet
    getRandomPlanetSpy.calls.mostRecent().returnValue.subscribe(() => {
      fixture.detectChanges(); // update view with planet
      expect(planetEl.textContent).toBe(testPlanet);
      expect(errorMessage()).toBeNull('should not show error');
      done();
    });

  });

});
