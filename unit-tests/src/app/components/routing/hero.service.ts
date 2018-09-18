import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from './hero';

@Injectable()
export class HeroService {

    // this service will be mocked

  constructor() { }

  getHeroes(): Observable<Hero[]> {
    return of();
  }

}
