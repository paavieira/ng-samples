import { Component } from '@angular/core';

@Component({
  selector: "my-switch",
  template: `
    <button (click)="clicked()">Click me!</button>
    <span>{{message}}</span>`
})
export class SwitchComponent {
  isOn = false;

  clicked() {
    this.isOn = !this.isOn;
  }

  get message() {
    return `The light is ${this.isOn ? 'on' : 'off'}`;
  }

}
