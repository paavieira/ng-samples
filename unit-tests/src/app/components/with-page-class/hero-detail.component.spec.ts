import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Hero } from './hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroDetailService } from './hero-detail.service';

import { click } from '../../helpers/click';
import { ActivatedRouteStub } from '../../helpers/activated-route-stub';
import { newEvent } from '../../helpers/new-events';
import { asyncData } from '../../helpers/async-data';

// Test Vars

let fixture: ComponentFixture<HeroDetailComponent>;
let component: HeroDetailComponent;
let page: Page;

let testHero: Hero = {id: 42, name: 'Test Hero'};

// Helpers

class Page {
  // getter properties wait to query the DOM until called.
  get buttons()     { return this.queryAll<HTMLButtonElement>('button'); }
  get saveBtn()     { return this.buttons[0]; }
  get cancelBtn()   { return this.buttons[1]; }
  get nameDisplay() { return this.query<HTMLElement>('span'); }
  get nameInput()   { return this.query<HTMLInputElement>('input'); }

  gotoListSpy: jasmine.Spy;
  navigateSpy:  jasmine.Spy;

  constructor(fixture: ComponentFixture<HeroDetailComponent>) {
    // get the navigate spy from the injected router spy object
    const routerSpy = fixture.debugElement.injector.get(Router) as jasmine.SpyObj<Router>;
    this.navigateSpy = routerSpy.navigate;

    // spy on component's `gotoList()` method
    const component = fixture.componentInstance;
    this.gotoListSpy = spyOn(component, 'gotoList').and.callThrough();
  }

  //// query helpers ////
  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }

  private queryAll<T>(selector: string): T[] {
    return fixture.nativeElement.querySelectorAll(selector);
  }
}

class HeroDetailServiceSpy {

  /* emit cloned test hero */
  getHero = jasmine.createSpy('getHero').and.callFake(
    () => asyncData(Object.assign({}, testHero))
  );

  /* emit clone of test hero, with changes merged in */
  saveHero = jasmine.createSpy('saveHero').and.callFake(
    (hero: Hero) => asyncData(Object.assign(testHero, hero))
  );

}

/** Create the HeroDetailComponent, initialize it, set test variables  */
let createComponent = () => {
  fixture = TestBed.createComponent(HeroDetailComponent);
  component = fixture.componentInstance;
  page = new Page(fixture);

  // 1st change detection triggers ngOnInit which gets a hero
  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    // 2nd change detection displays the async-fetched hero
    fixture.detectChanges();
  });
};

let createRouterSpy = (): jasmine.SpyObj<Router> => {
  return jasmine.createSpyObj('Router', ['navigate']);
};

// Tests

describe('HeroDetailComponent', () => {

  beforeEach(async(() => {
    const activatedRoute = new ActivatedRouteStub({id: testHero.id});
    const routerSpy = createRouterSpy();

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: HeroDetailService, useClass: HeroDetailServiceSpy },
        { provide: Router, useValue: routerSpy}
      ]
    });

    createComponent();

  }));

  it('should display that hero\'s name', () => {
    expect(page.nameDisplay.textContent).toBe(testHero.name);
  });

  it('should navigate when click cancel', () => {
    click(page.cancelBtn);
    expect(page.navigateSpy.calls.any()).toBe(true, 'router.navigate called');
  });

  it('should save when click save but not navigate immediately', () => {
    // Get service injected into component and spy on its`saveHero` method.
    // It delegates to fake `HeroService.updateHero` which delivers a safe test result.
    const heroDetailServiceSpy = fixture.debugElement.injector.get(HeroDetailService) as jasmine.SpyObj<HeroDetailService>;

    click(page.saveBtn);
    expect(heroDetailServiceSpy.saveHero.calls.any()).toBe(true, 'HeroDetailService.save called');
    expect(page.navigateSpy.calls.any()).toBe(false, 'router.navigate not called');
  });

  it('should navigate when click save and save resolves', fakeAsync(() => {
    click(page.saveBtn);
    tick(); // wait for async save to complete
    expect(page.navigateSpy.calls.any()).toBe(true, 'router.navigate called');
  }));

  it('should convert hero name to Title Case', () => {
    // get the name's input and display elements from the DOM
    const hostElement = fixture.nativeElement;
    const nameInput: HTMLInputElement = hostElement.querySelector('input');
    const nameDisplay: HTMLElement = hostElement.querySelector('span');

    // simulate user entering a new name into the input box
    nameInput.value = 'quick BROWN  fOx';

    // dispatch a DOM event so that Angular learns of input value change.
    nameInput.dispatchEvent(newEvent('input'));

    // Tell Angular to update the display binding through the title pipe
    fixture.detectChanges();

    expect(nameDisplay.textContent).toBe('Quick Brown  Fox');
  });

});
