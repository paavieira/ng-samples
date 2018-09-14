import { Component } from "@angular/core";

@Component({
  selector: 'my-binding-banner',
  template: '<h1>{{title}}</h1>',
  styles: ['h1 { color: green; font-size: 350%}']
})
export class BindingBannerComponent {
  title = 'Test Tour of Heroes';
}
