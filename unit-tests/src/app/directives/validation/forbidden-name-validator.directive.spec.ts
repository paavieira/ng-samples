import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ForbiddenNameValidatorDirective } from './forbidden-name-validator.directive';
import { newEvent } from '../../helpers/new-events';

@Component({
  template: `
    <form>
      <input name="name" appForbiddenName="bob" ngModel value="alice">
    </form>`
})
class TestComponent { }

describe('directives > validation', () => {

  let fixture: ComponentFixture<TestComponent>;

  let inputDe: DebugElement;
  let formDe: DebugElement;

  let control: NgModel;
  let form: NgForm;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        TestComponent,
        ForbiddenNameValidatorDirective
      ],
    });

    fixture = TestBed.createComponent(TestComponent);

    inputDe = fixture.debugElement.query(By.directive(ForbiddenNameValidatorDirective));
    formDe = fixture.debugElement.query(By.css('form'));

    form = formDe.injector.get(NgForm);
    control = inputDe.injector.get(NgModel);

    fixture.detectChanges();

  }));

  it('form should be valid at initialization', () => {

    expect(form.valid).toBe(true);
    expect(control.hasError('forbiddenName')).toBe(false);

  });

  it('form should be invalid when input value is changed to "bob"', async(() => {

    const input = inputDe.nativeElement as HTMLInputElement;;
    input.value = 'bob';
    input.dispatchEvent(newEvent('input'));

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(form.valid).toBe(false);
      expect(control.hasError('forbiddenName')).toBe(true);
    });

  }));

});
