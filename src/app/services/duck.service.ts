import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Duck } from '../models/Duck';

/*

READS:
  - Expose a read-only Observable (duck$) for templates/components.

WRITES:
  - Direct .next(...) calls via an exposed BehaviorSubject.

We will refine later:
  - Allowing components to call .next means ANY component can mutate state.
  - Better is to centralize writes in the store (setter/methods).
*/

@Injectable({
  providedIn: 'root',
})
export class DuckService {

  // Write-capable Subject (still exposed in this teaching step)
  public readonly duckSubject = new BehaviorSubject<Duck>({
    nickName: 'Sir Honk',
    age: 3,
    weight: 5.3,
  });

  /*
  Read-only stream exposed to consumers.

  `$` suffix convention:
    "this is a stream (Observable)"

  asObservable():
    returns an Observable view of the subject
    (no .next/.error/.complete available on the returned type)
  */
  public readonly duck$: Observable<Duck> = this.duckSubject.asObservable();

  /*
  Optional snapshot getter (handy in event handlers).
  Not required, but often useful.
  */
  get Duck(): Duck {
    return this.duckSubject.value;
  }
}