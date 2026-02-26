import { Component } from '@angular/core';
import { DuckService } from '../../services/duck.service';
import { Duck } from '../../models/Duck';

@Component({
  selector: 'app-duck-preview',
  templateUrl: './duck-preview.component.html',
  styleUrl: './duck-preview.component.css',
})
export class DuckPreviewComponent {

  private _duckService: DuckService;

  constructor(duckService: DuckService) {
    this._duckService = duckService;
  }

  // This getter creates a LIVE VIEW into the service state.
  //
  // Angular calls this getter every change detection cycle.
  //
  // This is PULL-BASED state access:
  // Angular pulls the latest value when rendering.
  //
  // This is why the UI updates, even though no notification exists.
  get duck(): Duck {
    return this._duckService.Duck;
  }

  public updateNickName() {

    // This updates the service state.
    // No components are notified directly.
    //
    // However, Angular change detection runs because this was triggered
    // by a click event, and Angular re-pulls state via the getter.
    this._duckService.Duck = {
      ...this.duck,
      nickName: "Sergeant Honk"
    };
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

Reactive state (BehaviorSubject, Signals) uses PUSH:
the state system NOTIFIES components when state changes.

Pull = Angular asks "has anything changed?"
Push = State says "something changed."

Signals and BehaviorSubject implement PUSH.
*/