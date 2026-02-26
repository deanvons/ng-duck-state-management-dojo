import { Component, OnInit } from '@angular/core';
import { DuckService } from '../../services/duck.service';
import { Duck } from '../../models/Duck';

@Component({
  selector: 'app-duck-details',
  imports: [],
  templateUrl: './duck-details.component.html',
  styleUrl: './duck-details.component.css'
})
export class DuckDetailsComponent implements OnInit{

  // DI needs this to be private
  private _duckService: DuckService;

  // So we need a public duck to expose to the template
  public duck:Duck|undefined

  constructor(duckService: DuckService) {
    this._duckService = duckService;
  }

  ngOnInit(): void {
    // Extract the duck state from the service
    this.duck = this._duckService.getDuck()
  }
}
