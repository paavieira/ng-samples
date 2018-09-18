import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from './hero';
import { HeroService } from './hero.service';



@Component({
  selector: 'dashboard',
  template: `
    <div *ngFor="let hero of heroes" class="hero" (click)="gotoDetail(hero)">
      {{hero.name | uppercase}}
    </div>`
})

export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(
    private router: Router,
    private heroService: HeroService,
  ) { }

  ngOnInit() {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  gotoDetail(hero: Hero) {
    let url = `/heroes/${hero.id}`;
    this.router.navigateByUrl(url);
  }

}
