import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from './hero';

@Injectable()
export class HeroDetailService {

  // this service will be mocked

  getHero(id: number | string): Observable<Hero> {
    return of();
  }

  saveHero(hero: Hero): Observable<Hero> {
    return of();
  }

}
