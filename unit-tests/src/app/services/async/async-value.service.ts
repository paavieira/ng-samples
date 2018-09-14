import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class AsyncValueService {

  private value$: Subject<string> = new Subject();

  getObservableValue(): Observable<string> {
    return this.value$.asObservable();
  }

  getPromiseValue(): Promise<string> {
    return this.toPromise(this.value$);
  }

  next(value: string) {
    this.value$.next(value);
  }

  // convert observable to promise
  private toPromise<T>(observable: Observable<T>): Promise<T> {
    return new Promise<T>(resolve => {
      let subscription = observable.subscribe(value => {
        resolve(value);
        subscription.unsubscribe();
      });
    });
  }

}
