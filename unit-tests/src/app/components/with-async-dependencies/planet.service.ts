import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Planet } from './planet';

@Injectable()
export class PlanetService {

  private url = 'https://swapi.co/api/planets';

  constructor(private http: HttpClient) {}

  getRandomPlanet(): Observable<string> {
    return this.http
      .get<Planet>(`${this.url}/${this.randomId()}`)
      .pipe(map(planet => `${planet.name} (population: ${planet.population})`));
  }

  private randomId(): number {
    return Math.floor(Math.random() * 50) + 1; // from 1 to 50
  }

}
