import { Component, OnInit } from '@angular/core';

// (os imports foram omitidos)

@Component({
  selector: 'my-app',
  template: `
    <nav>
      <a routerLink="/dashboard">Dashboard</a>
      <a routerLink="/heroes">Heroes</a>
      <a routerLink="/about">About</a>
    </nav>
  `
})

export class RouterLinkComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
