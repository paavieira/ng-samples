import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Hero } from './hero';



@Component({
  selector: 'dashboard-hero',
  template: `
    <div (click)="click()" class="hero">
      {{hero.name | uppercase}}
    </div>`
})
export class DashboardHeroComponent implements OnInit {

  @Input() hero: Hero;
  @Output() selected = new EventEmitter<Hero>();

  constructor() { }
  ngOnInit() { }

  click() {
    this.selected.emit(this.hero);
  }

}
