import { Component } from '@angular/core';
import { DuckService } from '../../services/duck.service';
import { Duck } from '../../models/Duck';

@Component({
  selector: 'app-duck-details',
  templateUrl: './duck-details.component.html',
  styleUrl: './duck-details.component.css'
})
export class DuckDetailsComponent {

  private _duckService: DuckService;

  constructor(duckService: DuckService) {
    this._duckService = duckService;
  }

  // This getter is NOT notified when state changes.
  //
  // Instead, Angular calls it again during change detection.
  //
  // This creates the illusion of reactive state,
  // but Angular is simply re-reading the value.
  //
  // This is PULL, not PUSH.
  get duck(): Duck {
    return this._duckService.Duck;
  }
}