import { Injectable } from '@angular/core';

@Injectable()
export class ValueService {

  private _value: string;

  getValue() {
    return this._value;
  }

  setValue(value: string) {
    this._value = value;
  }

}
