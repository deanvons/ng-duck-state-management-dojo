import { Injectable } from '@angular/core';
import { Duck } from '../models/Duck';

/*
PUB/SUB STATE STORE (NO RXJS, NO SIGNALS)

This service now implements TRUE PUSH-BASED STATE.

Key idea:
When state changes, subscribers are NOTIFIED explicitly.

This solves the core flaw of naive get/set:
previously, components had to PULL state during change detection.

Now the store PUSHES notifications.

This is conceptually identical to where we will end up later:

BehaviorSubject → next()
Signals → signal.set() / update()

but implemented manually.
*/

@Injectable({
  providedIn: 'root',
})
export class DuckService {

  // -----------------------------
  // INTERNAL STATE STORAGE
  // -----------------------------

  private _duck: Duck = {
    nickName: 'Sir Honk',
    age: 3,
    weight: 5.3,
  };

  /*
  Subscribers are functions that will be called when state changes.

  Each subscriber is responsible for updating its own component state.

  This is the core of pub/sub:
  - publisher = this service
  - subscribers = components
  */
  private _subscribers: Array<(duck: Duck) => void> = [];


  // -----------------------------
  // PUBLIC STATE ACCESS (READ)
  // -----------------------------

  /*
  Getter allows synchronous access to current state.

  This is still useful for initial load and direct reads.

  IMPORTANT:
  This getter DOES NOT create reactivity by itself.
  Reactivity comes from subscription notifications.
  */
  get Duck(): Duck {
    return this._duck;
  }


  // -----------------------------
  // PUBLIC STATE ACCESS (WRITE)
  // -----------------------------

  /*
  Setter updates state AND notifies all subscribers.

  This is the key difference from naive get/set.

  Now the store PUSHES updates.
  */
  set Duck(value: Duck) {

    this._duck = value;
    
    alert("Duck updated");

    // Notify all subscribers immediately
    this.notifySubscribers();
  }


  // -----------------------------
  // SUBSCRIPTION MANAGEMENT
  // -----------------------------

  /*
  subscribe()

  Registers a subscriber callback.

  Returns an unsubscribe function.

  This mirrors BehaviorSubject.subscribe().
  */
  subscribe(callback: (duck: Duck) => void): () => void {

    this._subscribers.push(callback);

    // Immediately emit current state
    // This ensures subscriber starts in sync
    callback(this._duck);

    // Return unsubscribe function
    return () => {
      this._subscribers = this._subscribers.filter(s => s !== callback);
    };
  }


  // -----------------------------
  // INTERNAL NOTIFICATION SYSTEM
  // -----------------------------

  /*
  notifySubscribers()

  PUSHES state to all listeners.

  This is the core reactive mechanism.
  */
  private notifySubscribers(): void {

    for (const subscriber of this._subscribers) {
      subscriber(this._duck);
    }
  }
}

/*
===============================================================================
OBSERVER PATTERN STATE STORE — SUMMARY
===============================================================================

This service implements the Observer Pattern manually.

Flow:

1. Components subscribe:
       this.unsubscribe = duckService.subscribe(callback)

2. Store updates state:
       duckService.Duck = newValue

3. Store notifies observers:
       notifySubscribers()

4. Components receive PUSH updates automatically.


This is TRUE reactive state.

The store PUSHES updates.
Components do NOT need to poll or re-read state.


===============================================================================
WHY unsubscribe() IS REQUIRED
===============================================================================

subscribe() returns an unsubscribe function:

       const unsubscribe = subscribe(callback)

Calling unsubscribe():

       unsubscribe()

removes the observer from the store.

This prevents memory leaks when components are destroyed.

Angular lifecycle:

       ngOnInit()    → subscribe
       ngOnDestroy() → unsubscribe


===============================================================================
LIMITATION OF MANUAL OBSERVER IMPLEMENTATION
===============================================================================

This implementation works, but requires manual management:

• manual subscriber storage
• manual notifications
• manual unsubscribe lifecycle


===============================================================================
NEXT STEP: BEHAVIORSUBJECT
===============================================================================

BehaviorSubject is a built-in Observer Pattern implementation.

It replaces manual subscriber management with:

       subject.subscribe(callback)
       subject.next(newState)
       subscription.unsubscribe()

Same pattern — cleaner, safer, idiomatic Angular.
===============================================================================
*/