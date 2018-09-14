import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PlanetService } from './planet.service';

import { startWith, catchError } from 'rxjs/operators';

@Component({
  selector: 'sw-planets',
  template: `
    <p class="planet"><i>{{planet|async}}</i></p>
    <button (click)="next()">Next planet</button>
    <p class="error" *ngIf="error">{{ error }}</p>`,
})

export class PlanetsComponent implements OnInit {

  error: string;
  planet: Observable<string>;

  constructor(
    private service: PlanetService,
  ) { }

  ngOnInit() { this.next(); }

  next() {
    this.error = '';
    this.planet = this.service.getRandomPlanet().pipe(
      startWith('...'),
      catchError( (err: any) => {
        // Wait a turn because errorMessage already set once this turn
        setTimeout(() => {
          this.error = err.message || err.toString();
        });
        return of('...'); // reset message to placeholder
      })
    );
  }

}
