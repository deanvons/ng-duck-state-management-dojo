import { Component, OnInit } from '@angular/core';
import { DuckService } from '../../services/duck.service';
import { Duck } from '../../models/Duck';

@Component({
  selector: 'app-duck-details',
  templateUrl: './duck-details.component.html',
  styleUrl: './duck-details.component.css'
})
export class DuckDetailsComponent implements OnInit {

  private _duckService: DuckService;

  // This is also a LOCAL CACHED SNAPSHOT
  //
  // The template reads from THIS field.
  //
  // Angular change detection re-renders this field,
  // but does NOT refresh it from the service automatically.
  public duck: Duck | undefined;

  constructor(duckService: DuckService) {
    this._duckService = duckService;
  }

  ngOnInit(): void {

    // This copies the service state ONCE.
    //
    // After this, this component has its own independent snapshot.
    //
    // When the service updates later, this value stays stale,
    // because nothing refreshes it.
    this.duck = this._duckService.getDuck();
  }

  /*
    IMPORTANT CHANGE DETECTION INSIGHT:

    Angular change detection DOES run when the duck is updated elsewhere.

    But change detection only re-renders template bindings.
    It does NOT automatically re-fetch data from services.

    Since this component never calls getDuck() again,
    its cached snapshot remains stale.

    This is why sibling components fall out of sync.
  */
}