import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'size'
})
export class SizePipe implements PipeTransform {

  transform(arr: Array<any>, xs: boolean, s: boolean, m: boolean, l: boolean, xl: boolean): any {
    let newArr: Array<any> = [];
    console.log("xs", xs);
    console.log("s", s);
    console.log("m", m);

    if (xs && s && m && l && xl) {
      newArr = arr;
    }
    if (xs === false) {
      newArr = arr.filter(str => str.xs === true);
    }
    if (s === false) {
      newArr = arr.filter(str => str.s === true);
    }
    if (m === false) {
      newArr = arr.filter(str => str.m === true);
    }
    if (l === false) {
      newArr = arr.filter(str => str.l === true);
    }
    if (xl === false) {
      newArr = arr.filter(str => str.xl === true);
    }
    return newArr;
  }

}
