import { Component, OnDestroy, OnInit } from '@angular/core';
import { DuckService } from '../../services/duck.service';
import { Duck } from '../../models/Duck';

/*
Sibling component receives updates independently.

This proves true pub/sub.

No getters required.
No Angular change detection tricks required.
*/

@Component({
  selector: 'app-duck-details',
  templateUrl: './duck-details.component.html',
  styleUrl: './duck-details.component.css'
})
export class DuckDetailsComponent implements OnInit, OnDestroy {

  duck!: Duck;

  private unsubscribe!: () => void;

  constructor(private duckService: DuckService) {}

  ngOnInit(): void {

    this.unsubscribe = this.duckService.subscribe(duck => {

      this.duck = duck;

      console.log("DetailsComponent received PUSH update");
    });
  }

  // need to ensure unsubscribe to avoid memory leaks
  ngOnDestroy(): void {
    this.unsubscribe();
  }
}