import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Duck } from '../models/Duck';

/*
BEHAVIORSUBJECT STATE STORE (RXJS)

BehaviorSubject is an Observer Pattern implementation provided by RxJS.

Key properties of BehaviorSubject:
- It stores the *current value* (state).
- It emits the current value immediately to any new subscriber.
- It notifies all subscribers when you call next(newValue).

This maps directly to your manual observer store:
- _subscribers[]      → internal subscriber list (managed by RxJS)
- notifySubscribers() → next(newValue)
- _duck               → current value stored in the BehaviorSubject
*/

@Injectable({
  providedIn: 'root',
})
export class DuckService {

  /*
  Private subject (implementation detail).

  We keep the BehaviorSubject private to prevent other code from calling:
      this._duckSubject.next(...)
  from outside the service.

  That keeps writes centralized and predictable.
  */
  private readonly _duckSubject = new BehaviorSubject<Duck>({
    nickName: 'Sir Honk',
    age: 3,
    weight: 5.3,
  });

  /*
  Public observable stream.

  The `$` suffix is a common Angular/RxJS convention meaning:
      "this is a stream (Observable), not a plain value"

  duck$ will emit a Duck immediately on subscribe,
  and then emit again whenever the state changes.
  */
  public readonly duck$: Observable<Duck> = this._duckSubject.asObservable();

  /*
  Synchronous read of the current state.

  BehaviorSubject keeps the current value available via `.value`.

  Useful for:
  - event handlers where you want a snapshot
  - building the next state: { ...this.Duck, nickName: 'x' }

  NOTE:
  Reading `.value` does not create reactivity.
  Reactivity comes from subscribing to duck$ (or async pipe).
  */
  get Duck(): Duck {
    return this._duckSubject.value;
  }

  /*
  State update entry point.

  next(value) does two things:
  1) updates the current value
  2) notifies all subscribers (PUSH)

  This is the BehaviorSubject equivalent of your notifySubscribers().
  */
  set Duck(value: Duck) {
    alert('Duck updated');
    this._duckSubject.next(value);
  }
}

/*
WHEN TO USE asObservable()

BehaviorSubject is BOTH:
- an Observable (you can subscribe to it)
- an Observer (it has next/error/complete)

If you expose the BehaviorSubject directly, other code could do:
    duckSubject.next(...)

That breaks encapsulation (anyone can mutate your state).

So we usually:
- keep the BehaviorSubject private
- expose ONLY an Observable via asObservable()

Rule of thumb:
- Use asObservable() when you want READ-ONLY access for consumers.
- Keep next() calls inside the store/service only.
- Use duck$ | async for UI so Angular manages subscriptions. 
- Use the getter (snapshot) and store methods/setters for imperative interactions like click handlers.
*/