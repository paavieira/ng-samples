import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from './hero';

@Injectable()
export class HeroDetailService {

  // this service does nothing as it will be mocked by the tests

  getHero(id: number | string): Observable<Hero> {
    return of();
  }

  saveHero(hero: Hero): Observable<Hero> {
    return of();
  }

}
