import { HttpErrorResponse } from '@angular/common/http';

import { asyncData } from './async-data';
import { asyncError } from './async-error';

import { HeroService } from './hero.service';
import { Hero } from './hero';

describe('HeroService', () => {

  let httpSpy: { get: jasmine.Spy };
  let heroService: HeroService;

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['get']);
    heroService = new HeroService(<any>httpSpy);
  });

  it('200', () => {

    const expectedHeroes: Hero[] = [
      { id: 1, name: 'A' },
      { id: 2, name: 'B' }
    ];

    httpSpy.get.and.returnValue(
      asyncData<Hero[]>(expectedHeroes)
    );

    heroService.getHeroes().subscribe(
      heroes => expect(heroes).toEqual(expectedHeroes),
      fail
    );

    expect(httpSpy.get.calls.count())
      .toBe(1);

  });


  it('404', () => {

    const errorResponse = new HttpErrorResponse({
      error: '404',
      status: 404,
      statusText: 'Not Found'
    });

    httpSpy.get.and.returnValue(
      asyncError(errorResponse)
    );

    heroService.getHeroes().subscribe(
      heroes => fail('expected an error, not heroes'),
      error => expect(error.message).toContain('404')
    );

  });

});
