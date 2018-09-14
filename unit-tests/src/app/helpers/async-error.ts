import { defer } from 'rxjs';

export const asyncError = <T>(errorObject: any) => {
  return defer(() => Promise.reject(errorObject));
}
