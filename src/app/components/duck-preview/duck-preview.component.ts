import { Component, OnDestroy, OnInit } from '@angular/core';
import { DuckService } from '../../services/duck.service';
import { Duck } from '../../models/Duck';

/*
This component now SUBSCRIBES to state changes.

It no longer relies on Angular pulling state.

Instead, the store PUSHES updates into this component.
*/

@Component({
  selector: 'app-duck-preview',
  templateUrl: './duck-preview.component.html',
  styleUrl: './duck-preview.component.css',
})
export class DuckPreviewComponent implements OnInit, OnDestroy {

  duck!: Duck;

  private unsubscribe!: () => void;

  constructor(private duckService: DuckService) {}


  /*
  Subscribe when component starts.

  Now state updates arrive immediately when store changes.
  */
  ngOnInit(): void {

    this.unsubscribe = this.duckService.subscribe(duck => {

      // This runs ONLY when state changes

      this.duck = duck;

      console.log("PreviewComponent received PUSH update");
    });
  }


  /*
  Clean up subscription to prevent memory leaks.

  This is required in pub/sub and BehaviorSubject systems.
  */
  ngOnDestroy(): void {
    this.unsubscribe();
  }


  /*
  Update state through store.

  Store will notify all subscribers.
  */
  updateNickName(): void {

    this.duckService.Duck = {
      ...this.duck,
      nickName: "Sergeant Honk"
    };
  }
}