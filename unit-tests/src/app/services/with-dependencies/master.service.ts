import { Injectable } from '@angular/core';
import { ValueService } from '../simple/value.service';

@Injectable()
export class MasterService {

  constructor(
    private valueService: ValueService
  ) { }

  getValue() {
    return this.valueService.getValue();
  }

}
