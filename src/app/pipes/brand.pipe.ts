import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'brand',
  pure: false
})
export class BrandPipe implements PipeTransform {

  transform(products: Array<any>, searchBrand: Array<string>) {
    const newP = [];
    if (!products) {
      return [];
    }
    if (!searchBrand || searchBrand.length === 0) {
      return products;
    }
    products.filter(product => {
      searchBrand.map(search => {
        if (product.brand.toLowerCase() === search.toLowerCase()) {
          newP.push(product);
        }
      });
    });
    products = newP;
    return products;
  }

}
