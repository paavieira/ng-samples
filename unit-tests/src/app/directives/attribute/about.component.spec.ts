import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutComponent } from './about.component';
import { HighlightDirective } from './highlight.directive';

describe('directives > attribute > shallow test', () => {

  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutComponent, HighlightDirective],
      schemas:      [ NO_ERRORS_SCHEMA ]
    });
    fixture = TestBed.createComponent(AboutComponent);
    fixture.detectChanges(); // initial binding
  });

  it('should have skyblue <h2>', () => {
    const h2: HTMLElement = fixture.nativeElement.querySelector('h2');
    const bgColor = h2.style.backgroundColor;
    expect(bgColor).toBe('skyblue');
  });

});
