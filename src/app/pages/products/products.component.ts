import { Component, OnInit } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  minValue: number = 50;
  maxValue: number = 300;
  options: Options = {
    floor: 0,
    ceil: 400
  };

  constructor() { }

  ngOnInit() {
  }

}
