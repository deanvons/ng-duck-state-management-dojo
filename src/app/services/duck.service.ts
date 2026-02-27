import { Injectable, signal } from '@angular/core';
import { Duck } from '../models/Duck';

/*
REFINED SIGNAL STORE

Same idea as refined BehaviorSubject:

- Keep writable signal private (only store can mutate)
- Expose read-only signal to consumers
- Expose methods for writes (centralize rules/logging/etc.)
*/

@Injectable({ providedIn: 'root' })
export class DuckService {

  private readonly _duck = signal<Duck>({
    nickName: 'Sir Honk',
    age: 3,
    weight: 5.3,
  });

  // Read-only view: consumers can read (duck()), but cannot set/update
  public readonly duck = this._duck.asReadonly();

  updateNickName(newName: string): void {
    alert('Duck updated');
    this._duck.update(d => ({ ...d, nickName: newName }));
  }

  // Optional: snapshot getter if you want parity with BehaviorSubject `.value`
  get Duck(): Duck {
    return this._duck();
  }
}