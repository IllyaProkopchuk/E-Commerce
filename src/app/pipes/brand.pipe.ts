import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'brand',
  pure: false
})
export class BrandPipe implements PipeTransform {

  transform(arr: Array<any>, brandFilter: string= ''): any {
    // console.log(brandFilter);
    
    let newArr = [];

    if(!arr){
      return arr;
    }
    if(!brandFilter){
      return arr;
    }
    newArr = arr.filter(str => str.brand.toLowerCase() === brandFilter.toLowerCase());
    // console.log(newArr);
    arr = newArr;
    return arr;
  }

}
