/* tslint:disable:member-ordering */
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router }   from '@angular/router';

import { Hero } from './hero';
import { HeroDetailService } from './hero-detail.service';



@Component({
  selector: 'app-hero-detail',
  template: `
    <div *ngIf="hero">
      <h2><span>{{hero.name | titlecase}}</span> Details</h2>
      <div>
        <label>id: </label>{{hero.id}}</div>
      <div>
        <label for="name">name: </label>
        <input id="name" [(ngModel)]="hero.name" placeholder="name" />
      </div>
      <button (click)="save()">Save</button>
      <button (click)="cancel()">Cancel</button>
    </div>`,
})
export class HeroDetailComponent implements OnInit {

  constructor(
    private heroDetailService: HeroDetailService,
    private route:  ActivatedRoute,
    private router: Router) {
  }

  @Input() hero: Hero;

  ngOnInit(): void {
    // get hero when `id` param changes
    this.route.paramMap.subscribe(pmap => this.getHero(pmap.get('id')));
  }

  private getHero(id: string): void {
    this.heroDetailService.getHero(id).subscribe(hero => {
      if (hero) {
        this.hero = hero;
      } else {
        this.gotoList(); // id not found; navigate to list
      }
    });
  }

  save(): void {
    this.heroDetailService.saveHero(this.hero).subscribe(() => this.gotoList());
  }

  cancel() { this.gotoList(); }

  gotoList() {
    this.router.navigate(['/heroes']);
  }

}
