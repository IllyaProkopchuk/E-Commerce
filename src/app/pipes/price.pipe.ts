import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(arr: Array<any>, min: number = 0, max: number = 400): any {
    let newArr = arr.filter(str => str.price < max && str.price > min);
    console.log(newArr);
    return newArr;
  }

}
