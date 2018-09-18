import { DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';

import { of } from 'rxjs';

import { DashboardComponent } from './dashboard.component';
import { Hero } from './hero';
import { HeroService } from './hero.service';

import { click } from '../../helpers/click';

describe('components > routing', () => {

  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let router: Router;

  let heroesDe: DebugElement;
  let heroesEl: HTMLElement;

  let testHeroes: Hero[] = [ {id: 42, name: 'Test Hero'}, {id: 84, name: 'Test Villain'} ];

  let heroClick = () => {
    const firstHeroEl: HTMLElement = heroesEl.querySelector('.hero');
    click(firstHeroEl);
  };

  beforeEach(() => {

    const heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHeroes']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      providers: [
        { provide: HeroService, useValue: heroServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    router = TestBed.get(Router);

    heroesDe = fixture.debugElement;
    heroesEl = heroesDe.nativeElement;

    heroServiceSpy.getHeroes.and.returnValue(of(testHeroes));
    fixture.detectChanges();

  });

  it('should tell ROUTER to navigate when hero clicked', () => {

    heroClick(); // trigger click on first inner <div class="hero">

    // args passed to router.navigateByUrl() spy
    const spy = router.navigateByUrl as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];

    // expecting to navigate to id of the component's first hero
    const id = component.heroes[0].id;
    expect(navArgs).toBe('/heroes/' + id,
      'should nav to HeroDetail for first hero');

  });

});
