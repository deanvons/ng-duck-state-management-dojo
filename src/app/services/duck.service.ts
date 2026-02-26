import { Injectable } from '@angular/core';
import { Duck } from '../models/Duck';

@Injectable({
  providedIn: 'root',
})
export class DuckService {
  constructor() {}

  private _duck: Duck = {
    nickName: 'Sir Honk',
    age: 3,
    weight: 5.3,
  };

  // Classic OOP get set
  getDuck() {
    return this._duck;
  }
  setDuck(value: Duck) {
    this._duck = value;
    alert("Duck updated")
  }
}
