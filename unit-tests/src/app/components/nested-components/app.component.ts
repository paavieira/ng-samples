import { Component, OnInit } from '@angular/core';

// (os imports foram omitidos)

@Component({
  selector: 'app-root',
  template: `
    <app-banner></app-banner>
    <app-welcome></app-welcome>
    <nav>
      <a routerLink="/dashboard">Dashboard</a>
      <a routerLink="/heroes">Heroes</a>
      <a routerLink="/about">About</a>
    </nav>
    <router-outlet></router-outlet>`
})

export class AppComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
