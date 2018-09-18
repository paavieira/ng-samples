import { TitleCasePipe } from './title-case.pipe';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick, async } from '@angular/core/testing';
import { newEvent } from '../../helpers/new-events';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <input #name value="bob">
    <span>{{name.value|appTitleCase}}</span>`
})
class TestComponent { }

describe('pipes > dom', () => {

  let fixture: ComponentFixture<TestComponent>;

  let inputDe: DebugElement;
  let spanDe: DebugElement;

  let input: HTMLInputElement;
  let span: HTMLElement;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        TitleCasePipe
      ]
    });

    fixture = TestBed.createComponent(TestComponent);

    inputDe = fixture.debugElement.query(By.css('input'));
    spanDe = fixture.debugElement.query(By.css('span'));

    input = inputDe.nativeElement as HTMLInputElement;
    span = spanDe.nativeElement as HTMLElement;

    fixture.detectChanges();

  });

  it('should convert hero name to Title Case', () => {
    expect(span.textContent).toBe('Bob');
  });

  it('should convert hero name to Title Case', () => {

    // simulate user entering a new name into the input box
    input.value = 'quick BROWN  fOx';
    input.dispatchEvent(newEvent('input'));

    // Tell Angular to update the display binding through the title pipe
    fixture.detectChanges();

    expect(span.textContent).toBe('Quick Brown  Fox');

  });

});
