import { Injectable } from '@angular/core';
import { Duck } from '../models/Duck';

@Injectable({
  providedIn: 'root',
})
export class DuckService {

  // This is the SINGLE SOURCE OF TRUTH for duck state
  private _duck: Duck = {
    nickName: 'Sir Honk',
    age: 3,
    weight: 5.3,
  };

  // Returns the current duck state
  // IMPORTANT: This simply returns the value.
  // It does NOT notify anyone when the value changes.
  getDuck() {
    return this._duck;
  }

  // Updates the duck state
  // IMPORTANT: Angular is NOT aware this happened.
  // No components are notified automatically.
  setDuck(value: Duck) {
    this._duck = value;
    alert("Duck updated");
  }
}

/*
CHANGE DETECTION VS STATE SYNCHRONIZATION

Angular Change Detection:
- Re-renders template expressions
- Does NOT automatically reload service state
- Does NOT call getDuck() again

In this version, each component stores a LOCAL SNAPSHOT:

    service._duck   ← source of truth
        ↓
    component.duck  ← cached copy

When service state changes:

    service._duck changes
    component.duck stays stale

Angular re-renders component.duck correctly,
but component.duck itself was never refreshed.

Angular re-renders what you HAVE,
not what you SHOULD have.

This creates the classic "state synchronization problem".

Next step:
Using getters removes the cached copy and lets Angular
pull directly from the service during change detection.
*/