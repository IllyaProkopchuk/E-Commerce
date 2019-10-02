import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'products'
})
export class ProductsPipe implements PipeTransform {

  transform(arr: Array<any>, search: string= ''): any {
    console.log(arr);

    if(search === ''){
      return arr;
    }
    let newArr = arr.filter(str => str.category.toLowerCase() === search.toLowerCase());
    console.log(newArr);
    return newArr;
  }

}
