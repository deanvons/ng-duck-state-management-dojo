import { Component, OnInit } from '@angular/core';
import { DuckService } from '../../services/duck.service';
import { Duck } from '../../models/Duck';

@Component({
  selector: 'app-duck-preview',
  templateUrl: './duck-preview.component.html',
  styleUrl: './duck-preview.component.css',
})
export class DuckPreviewComponent implements OnInit {

  private _duckService: DuckService;

  // This is a LOCAL CACHED SNAPSHOT of the service state
  //
  // The template binds to THIS property, not the service directly.
  //
  // Angular change detection will re-render this value,
  // but Angular will NOT automatically refresh it from the service.
  public duck: Duck | undefined;

  constructor(duckService: DuckService) {
    this._duckService = duckService;
  }

  ngOnInit(): void {

    // This copies the current service state into the component.
    //
    // IMPORTANT:
    // This happens ONLY ONCE.
    //
    // After this, this.duck becomes independent of the service.
    //
    // Angular will NOT re-call getDuck() automatically.
    this.duck = this._duckService.getDuck();
  }

  public updateNickName() {

    // This updates the service state
    this._duckService.setDuck({
      ...this.duck!,
      nickName: "Sergeant Honk"
    });

    // CRITICAL LINE:
    // This refreshes the component's LOCAL CACHED COPY.
    //
    // Without this, the template would still show the old value.
    //
    // Angular change detection does NOT do this automatically.
    this.duck = this._duckService.getDuck();
  }
}