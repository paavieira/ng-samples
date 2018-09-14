import { Observable, of } from 'rxjs';

export const asyncData = <T> (data: T): Observable<T> => {
  return of<T>(data);
}
