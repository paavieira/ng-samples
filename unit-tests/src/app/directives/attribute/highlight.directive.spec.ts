import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HighlightDirective } from './highlight.directive';
import { By } from '@angular/platform-browser';
import { newEvent } from '../../helpers/new-events';

@Component({
  template: `
  <h2 highlight="yellow">Something Yellow</h2>
  <h2 highlight>The Default (Gray)</h2>
  <h2>No Highlight</h2>
  <input #box [highlight]="box.value" value="cyan"/>`
})
class TestComponent { }

describe('directives > with test component', () => {

  let fixture: ComponentFixture<TestComponent>;

  let des: DebugElement[];
  let bareH2: DebugElement;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [ HighlightDirective, TestComponent ]
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges(); // initial binding

    // all elements with an attached HighlightDirective
    des = fixture.debugElement.queryAll(By.directive(HighlightDirective));

    // the h2 without the HighlightDirective
    bareH2 = fixture.debugElement.query(By.css('h2:not([highlight])'));

  });

  // color tests
  it('should have three highlighted elements', () => {
    expect(des.length).toBe(3);
  });

  it('should color 1st <h2> background "yellow"', () => {
    const bgColor = des[0].nativeElement.style.backgroundColor;
    expect(bgColor).toBe('yellow');
  });

  it('should color 2nd <h2> background w/ default color', () => {
    const dir = des[1].injector.get(HighlightDirective) as HighlightDirective;
    const bgColor = des[1].nativeElement.style.backgroundColor;
    expect(bgColor).toBe(dir.defaultColor);
  });

  it('should bind <input> background to value color', () => {
    // easier to work with nativeElement
    const input = des[2].nativeElement as HTMLInputElement;
    expect(input.style.backgroundColor).toBe('cyan', 'initial backgroundColor');

    // dispatch a DOM event so that Angular responds to the input value change.
    input.value = 'green';
    input.dispatchEvent(newEvent('input'));
    fixture.detectChanges();

    expect(input.style.backgroundColor).toBe('green', 'changed backgroundColor');
  });

});
