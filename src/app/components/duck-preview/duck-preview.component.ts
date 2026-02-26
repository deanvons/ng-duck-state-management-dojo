import { Component, OnInit } from '@angular/core';
import { DuckService } from '../../services/duck.service';
import { Duck } from '../../models/Duck';

@Component({
  selector: 'app-duck-preview',
  imports: [],
  templateUrl: './duck-preview.component.html',
  styleUrl: './duck-preview.component.css',
})
export class DuckPreviewComponent implements OnInit{
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

  public updateNickName(){
    this._duckService.setDuck({...this.duck!,nickName:"Sergeant Honk"})

    // now we have to reload the rendered duck object
    this.duck = this._duckService.getDuck()
  }
  
}
