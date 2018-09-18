import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

// (os imports foram omitidos)

@Directive({ selector: '[highlight]' })
/** Set backgroundColor for the attached element to highlight color
 *  and set the element's customProperty to true */
export class HighlightDirective implements OnChanges {

  defaultColor =  'rgb(211, 211, 211)'; // lightgray

  @Input('highlight') bgColor: string;

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    this.el.nativeElement.style.backgroundColor = this.bgColor || this.defaultColor;
  }
}
