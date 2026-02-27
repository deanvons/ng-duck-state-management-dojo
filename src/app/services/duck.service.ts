import { Injectable, signal } from '@angular/core';
import { Duck } from '../models/Duck';

/*
NAIVE SIGNAL STORE (TEACHING STEP)

Signal is Angular's built-in reactive primitive.
- Reading:   duck()
- Writing:   duck.set(value) or duck.update(fn)

This is still the Observer Pattern conceptually,
but Angular manages subscriptions/dependencies for you.
*/

@Injectable({ providedIn: 'root' })
export class DuckService {

  // Writable signal (public in this naive step)
  public duck = signal<Duck>({
    nickName: 'Sir Honk',
    age: 3,
    weight: 5.3,
  });
}