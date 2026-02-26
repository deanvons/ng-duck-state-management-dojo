import { Injectable } from '@angular/core';
import { Duck } from '../models/Duck';

@Injectable({
  providedIn: 'root',
})
export class DuckService {

  // Private internal state storage
  private _duck: Duck = {
    nickName: 'Sir Honk',
    age: 3,
    weight: 5.3,
  };

  // Getter allows external readers to ACCESS state
  // IMPORTANT: This does NOT notify anyone when state changes.
  // It simply returns the current value when asked.
  get Duck(): Duck {
    return this._duck;
  }

  // Setter allows external writers to MODIFY state
  // IMPORTANT: This also does NOT notify anyone automatically.
  // Angular will NOT react to this unless change detection runs
  // and components re-read the getter.
  set Duck(value: Duck) {
    this._duck = value;

    // This alert proves the setter runs,
    // but Angular is NOT listening to this setter.
    alert("Duck updated");
  }
}

/*
STATE MANAGEMENT MODEL SUMMARY

This implementation uses PULL-BASED state access.

Components are NOT notified when state changes.
Instead, Angular re-reads state during change detection.

Flow:

Component updates state 
          ↓
Angular change detection runs
          ↓
Angular calls getters again
          ↓
UI reflects latest state

This is NOT true reactive state.

Also it means that getters are constantly being called even if the state hasn't changed, but because some other event triggered change detection-

Click anywhere
   ↓
Angular checks AppComponent
   ↓
Angular checks DuckPreviewComponent → getter runs (even if the getter gets a state which didn't change - DIRTY CHECKING) 
   ↓
Angular checks DuckDetailsComponent → getter runs (even if the getter gets a state which didn't change - DIRTY CHECKING)  
   ↓
Angular checks all other components

Reactive state (pub/sub or BehaviorSubject and Signals) uses PUSH:
the state system NOTIFIES components when state changes.

Pull = Angular asks "has anything changed?"
Push = State says "something changed."

Signals and BehaviorSubject implement PUSH.
*/