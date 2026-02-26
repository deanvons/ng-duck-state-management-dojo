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