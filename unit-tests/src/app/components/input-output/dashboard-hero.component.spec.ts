import { DebugElement, Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DashboardHeroComponent } from './dashboard-hero.component';
import { Hero } from './hero';
import { click } from '../../helpers/click';

describe('DashboardHeroComponent (standalone)', () => {

  let component: DashboardHeroComponent;
  let fixture: ComponentFixture<DashboardHeroComponent>;

  let heroDe: DebugElement;
  let heroEl: HTMLElement;

  let expectedHero: Hero;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [ DashboardHeroComponent ]
    });

    fixture = TestBed.createComponent(DashboardHeroComponent);
    component = fixture.componentInstance;

    // find the hero's DebugElement and element
    heroDe  = fixture.debugElement.query(By.css('.hero'));
    heroEl = heroDe.nativeElement;

    // mock the hero supplied by the parent component
    expectedHero = { id: 42, name: 'Test Name' };

    // simulate the parent setting the input property with that hero
    component.hero = expectedHero;

    // trigger initial data binding
    fixture.detectChanges();
  });

  it('should display hero name in uppercase', () => {
    const expectedPipedName = expectedHero.name.toUpperCase();
    expect(heroEl.textContent).toContain(expectedPipedName);
  });

  it('should raise selected event when clicked (triggerEventHandler)', () => {
    let selectedHero: Hero;
    component.selected.subscribe((hero: Hero) => selectedHero = hero);

    heroDe.triggerEventHandler('click', null);
    expect(selectedHero).toBe(expectedHero);
  });

  it('should raise selected event when clicked (element.click)', () => {
    let selectedHero: Hero;
    component.selected.subscribe((hero: Hero) => selectedHero = hero);

    heroEl.click();
    expect(selectedHero).toBe(expectedHero);
  });

  it('should raise selected event when clicked (click helper)', () => {
    let selectedHero: Hero;
    component.selected.subscribe(hero => selectedHero = hero);

    click(heroDe); // click helper with DebugElement
    click(heroEl); // click helper with native element

    expect(selectedHero).toBe(expectedHero);
  });

});


@Component({
  template: `
    <dashboard-hero
      [hero]="hero" (selected)="onSelected($event)">
    </dashboard-hero>`
})
class TestHostComponent {
  hero: Hero = {id: 42, name: 'Test Name' };
  selectedHero: Hero;
  onSelected(hero: Hero) { this.selectedHero = hero; }
}

describe('DashboardHeroComponent (inside a test host)', () => {

  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  let heroEl: HTMLElement;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [ DashboardHeroComponent, TestHostComponent ]
    });

    // create TestHostComponent instead of DashboardHeroComponent
    fixture  = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    heroEl   = fixture.nativeElement.querySelector('.hero');
    fixture.detectChanges(); // trigger initial data binding
  });

  it('should display hero name', () => {
    const expectedPipedName = testHost.hero.name.toUpperCase();
    expect(heroEl.textContent).toContain(expectedPipedName);
  });

  it('should raise selected event when clicked', () => {
    click(heroEl);
    // selected hero should be the same data bound hero
    expect(testHost.selectedHero).toBe(testHost.hero);
  });

});
