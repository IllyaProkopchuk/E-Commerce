import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'brand'
})
export class BrandPipe implements PipeTransform {

  transform(arr: Array<any>, brandFilter: string= ''): any {
    if(brandFilter === ''){
      return arr;
    }
    let newArr = arr.filter(str => str.brand.toLowerCase() === brandFilter.toLowerCase());
    console.log(newArr);
    return newArr;
  }

}
