import { Observable, defer } from 'rxjs';

export const asyncData = <T> (data: T): Observable<T> => {
  return defer(() => Promise.resolve(data));
}
