import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'size',
  pure: false
})
export class SizePipe implements PipeTransform {

  transform(products: Array<any>, searchTerm: Array<string>) {

    const newP = [];

    if (!products) {
      return [];
    }
    if (!searchTerm || searchTerm.length === 0) {
      return products;
    }

    products.filter(product => {
      searchTerm.map(search => {
        if (search == 'xs' && product.xs === true) {
          newP.push(product);
        }
        if (search == 's' && product.s === true) {
          newP.push(product);
        }
        if (search == 'm' && product.m === true) {
          newP.push(product);
        }
        if (search == 'l' && product.l === true) {
          newP.push(product);
        }
        if (search == 'xl' && product.xl === true) {
          newP.push(product);
        }
      });
    });
    // console.log('last chanse',this.getUnique(newP, 'id'));
    products = this.getUnique(newP, 'id');
    return products;
  }

  public getUnique(arr, comp) {
    const unique = arr.map(e => e[comp])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter(e => arr[e]).map(e => arr[e]);
    return unique;
  }
}
