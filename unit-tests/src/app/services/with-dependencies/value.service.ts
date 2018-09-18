import { Injectable } from '@angular/core';

@Injectable()
export class ValueService {

  private value: string;

  getValue() {
    return this.value;
  }

  setValue(value: string) {
    this.value = value;
  }

}
