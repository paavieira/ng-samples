import { Component, OnInit } from '@angular/core';

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
export class MenuComponent implements OnInit {

  constructor() { }
  ngOnInit() { }

}
